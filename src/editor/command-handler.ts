import * as vscode from 'vscode';
import * as path from 'path';
import {promises as fsPromises, existsSync, exists, readFile, readFileSync, writeFile} from 'fs';
import {FileUtils} from '../modules/common/file.util';
import {Xliff} from '../modules/xliff/xliff';
import {StringUtils} from '../modules/common/string.util';

const lineDecoration = vscode.window.createTextEditorDecorationType({
  isWholeLine: true,
  borderWidth: `0 0 1px 0`,
  borderStyle: `dashed`, //TODO: file bug, this shouldn't throw a lint error.
  borderColor: `red`
});

const keyDecoration = vscode.window.createTextEditorDecorationType({
  outline: '4px double green'
});

interface ICommandQueueItem {
  transUnit: i18n.TransUnit;
  hash: string;
  time: Date;
  cb: (result: i18nWebView.TransUnitUpdateResult) => void;
  omcb: (result: i18nWebView.TransUnitOmittedResult) => void;
}

class EditorTransUnitUpdateTaskManager {
  private readonly queueItemByTransUnitKey: { [key: string]: ICommandQueueItem } = {};
  private readonly transUnitKeyQueue: string[] = [];
  // private readonly commandQueue: ICommandQueueItem[] = [];

  private __interval_pin__: any | null = null;
  private __executing__: boolean = false;

  get activeTaskCount(): number {
    return this.transUnitKeyQueue.length;
  }

  get isRunning(): boolean {
    return this.__interval_pin__ !== null;
  }

  get isExecuting(): boolean {
    return this.__executing__;
  }

  constructor(
    private readonly sourceLocale: string,
    private readonly targetLocale: string,
    private readonly targetFile: string,
    private delayMilliseconds: number = 500,
    private intervalSeconds: number = 5,
    private itemEachPack: number = 10,
  ) {
    this.restart();
  }

  private restart() {
    if (this.__interval_pin__) {
      clearInterval(this.__interval_pin__);
      this.__interval_pin__ = null;
    }
    let packCount = this.itemEachPack;
    this.__interval_pin__ = setInterval(() => {
      if (!this.__executing__) {
        if (this.activeTaskCount === 0) {
          return;
        }
        let endIdx = Math.min(this.transUnitKeyQueue.length, packCount);
        let pack: string[] = this.transUnitKeyQueue.splice(0, endIdx);
        this._next(pack);
      } else {
        packCount += this.itemEachPack;
      }
    }, this.intervalSeconds * 1000);
  }

  pushCommand(
    cmd: i18nWebView.TransUnitUpdateCommand,
    eventSender: (result: i18nWebView.TransUnitUpdateResult) => void,
    omitEventSender: (result: i18nWebView.TransUnitOmittedResult) => void
  ) {
    cmd.transUnits.forEach(transUnit => {
      if (this.queueItemByTransUnitKey[transUnit.key]) {
        const item = this.queueItemByTransUnitKey[transUnit.key];
        const idx = this.transUnitKeyQueue.indexOf(transUnit.key);
        if (idx >= 0 && item.time <= cmd.time) {
          try {
            const now = new Date();
            const {
              omcb: pOMCB, hash: pHash, transUnit: pTransUnit,
            } = item;
            // sent post back event to remove webview task
            pOMCB({
              time: now,
              hash: now.getTime().toString(),
              commandHash: pHash,
              commandName: 'update-trans-unit-ommited',
              transUnitKey: pTransUnit.key,
              success: true,
              xliffFile: cmd.xliffFile
            });
          } catch (e) {
            console.error(`failed to send omit post back event`, e);
          }
          // omit previous item
          item.transUnit = transUnit;
          item.hash = cmd.hash;
          item.time = cmd.time;
          item.cb = eventSender;
          item.omcb = omitEventSender;
          // remove key from current queue
          this.transUnitKeyQueue.splice(idx, 1);
        }
      } else {
        this.queueItemByTransUnitKey[transUnit.key] = {
          transUnit: transUnit,
          hash: cmd.hash,
          time: cmd.time,
          cb: eventSender,
          omcb: omitEventSender,
        };
      }
      // enqueue
      this.transUnitKeyQueue.push(transUnit.key);
    });
  }

  flush() {
    const allItems = this.transUnitKeyQueue.slice(0, this.transUnitKeyQueue.length);
    this._next(allItems);
  }

  private _next(pack: string[]) {
    this.__executing__ = true;
    const reducer: Map<string, i18n.TransUnit[]> = new Map<string, i18n.TransUnit[]>();
    const transUnits: i18n.TransUnit[] = [];
    const distinctCmdCollection = pack.reduce<ICommandQueueItem[]>((arr, val) => {
      const cmd = this.queueItemByTransUnitKey[val];
      const rItem = reducer.get(cmd.hash);
      if (rItem) {
        rItem.push(cmd.transUnit);
      } else {
        reducer.set(cmd.hash, [cmd.transUnit]);
        arr.push(cmd);
      }
      transUnits.push(cmd.transUnit);
      return arr;
    }, []);
    // dequeue
    pack.forEach(p => {
      try {
        delete this.queueItemByTransUnitKey[p];
      } catch (e) {

      }
    });
    // read from file
    new Promise((resolve, reject) => {
      if (existsSync(this.targetFile)) {
        readFile(this.targetFile, {encoding: 'utf8'}, (err, content) => {
          const {
            transUnitByMsgId, errors
          } = Xliff.loadTransUnits(content, '');

          transUnits.forEach(t => {
            const tar = transUnitByMsgId[t.key];
            if (!tar) {
              transUnitByMsgId[t.key] = t;
            } else {
              tar.target = t.target;
              tar.state = t.state;
            }
          });

          const updatedTransUnits = Object.values(transUnitByMsgId);
          this._writeTransUnits(updatedTransUnits).then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          });
        });
      } else {
        this._writeTransUnits(transUnits).then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        });
      }
    }).then((val) => {
      distinctCmdCollection.forEach(cmd => {
        let transUnits = reducer.get(cmd.hash)!;
        let now = new Date();
        let result: i18nWebView.TransUnitUpdateResult = {
          time: now,
          hash: now.getTime().toString(),
          commandName: 'update-trans-unit',
          commandHash: cmd.hash,
          xliffFile: '',
          success: true,
          transUnits: transUnits,
          errors: {},
        };
        cmd.cb(result);
      });
    }).catch((err) => {
      const error = {code: 0, message: `failed to save trans unit to '${this.targetFile}', ${err}`};
      distinctCmdCollection.forEach(cmd => {
        let transUnits = reducer.get(cmd.hash)!;
        let now = new Date();
        let result: i18nWebView.TransUnitUpdateResult = {
          time: now,
          hash: now.getTime().toString(),
          success: true, // mark success and populate errors instead
          commandName: 'update-trans-unit',
          commandHash: cmd.hash,
          xliffFile: '',
          transUnits: transUnits,
          errors: transUnits.reduce((a: { [name: string]: string }, v) => {
            a[v.key] = error.message;
            return a;
          }, {}),
        };
        cmd.cb(result);
      });
    }).finally(() => {
      this.__executing__ = false;
    });
  }

  private _writeTransUnits(transUnits: i18n.TransUnit[]): Promise<boolean> {
    const content = Xliff.writeTransUnits(transUnits, this.sourceLocale, this.targetLocale, false);
    return new Promise<any>((resolve, reject) => {
      writeFile(this.targetFile, content, {encoding: 'utf8'}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export const G_TransUnitUpdateManagerDict: { [filename: string]: EditorTransUnitUpdateTaskManager } = {};

export class EditorCommandHandler {

  private activeCodeRevealEditor!: vscode.TextEditor;

  private static readonly commandResultMap = {
    'list-xliff-files': 'list-xliff-files-loaded',
    'load-xliff-file': 'xliff-file-loaded',
    'load-trans-unit-code-ctx': 'trans-unit-code-ctx-loaded',
    'update-trans-unit': 'trans-unit-updated',
    'reveal-code-ctx': 'code-ctx-revealed',
  };

  constructor(
    private webview: vscode.Webview,
    private setting: INgI18nExtSetting,
  ) {

  }

  updateSetting(setting: INgI18nExtSetting) {
    this.setting = setting;
  }

  handle<K extends i18nWebView.CommandName>(command: K, message: i18nWebView.I18nTranslateWebViewCommandMap[K]) {
    console.log(`command received: ${command}`, message);
    const handlerName = command.split('-')
      .map((val, idx) => idx === 0 ? val : `${val[0].toUpperCase()}${val.substring(1)}`)
      .join('');
    const handler = (this as any)[handlerName] as Function;
    if (typeof handler === 'function') {
      handler.apply(this, [message]);
    } else {
      const callbackCmd = (EditorCommandHandler.commandResultMap as any)[command];
      if (callbackCmd) {
        const errorMsg = `handler not found for command: ${command}, expected: ${handlerName}`;
        const error = this.buildErrorCallbackResult(command, message, errorMsg, -1);
        this.sendMessage(callbackCmd, error as any);
        console.warn(errorMsg, command, message);
      } else {
        throw new Error(`handler not found for command: ${command}, expected: ${handlerName}`);
      }
    }
  }

  listXliffFiles(command: i18nWebView.ListXliffFilesCommand) {
    const baseDir = vscode.workspace.rootPath;
    let detectionRootFolder = path.resolve(baseDir!);
    let result: i18nWebView.ListXliffFilesResultEvent = {
      ...this.buildCallbackResultBase(
        'list-xliff-files', command
      ),
      dir: detectionRootFolder,
      locales: this.setting.locales,
      files: this.setting.editor.messageLocations.map(i => {
        return {
          name: i,
          path: path.resolve(detectionRootFolder, i)
        };
      }),
    };
    this.sendMessage('list-xliff-files-loaded', result);
  }

  loadXliffFile(command: i18nWebView.LoadXliffFileCommand) {
    const file = command.xliffFile;
    const tarLocale = command.locale;
    const targetXliff = FileUtils.getCorrespondingTranslationFile(file, tarLocale);
    let result: i18nWebView.LoadXliffFileResultEvent = {} as any;
    Promise.all(
      [
        fsPromises.readFile(file, {encoding: 'utf8'}),
        existsSync(targetXliff) ? fsPromises.readFile(targetXliff, {encoding: 'utf8'}) : Promise.resolve('NOT-EXISTS')
      ]
    ).then((fileReadResults) => {
      let sourceContent = fileReadResults[0];
      let targetContent = fileReadResults[1];
      const {transUnitByMsgId, errors, sourceLocale} = Xliff.loadTransUnits(sourceContent, '');
      if (errors && errors.length > 0 || !sourceLocale) {
        const errMsg = `failed to load trans units from ${file}. Errors: ${errors?.join('; ')}`;
        result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
      } else {
        if (targetContent !== 'NOT-EXISTS') {
          const {
            transUnitByMsgId: translationById,
            errors: tErrors,
            sourceLocale: tSourceLocale,
            targetLocale: tTargetLocale,
          } = Xliff.loadTransUnits(targetContent, '');
          if (tErrors && tErrors.length > 0) {
            const errMsg = `failed to load translations from ${targetXliff}. Errors: ${errors?.join('; ')}`;
            result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
          } else if (tSourceLocale !== sourceLocale) {
            const errMsg = `the translation file source locale is not match. actual: ${tSourceLocale}, expected: ${sourceLocale}`;
            result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
          } else if (tTargetLocale !== tarLocale) {
            const errMsg = `the translation file target locale is not match. actual: ${tTargetLocale}, expected: ${tarLocale}`;
            result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
          } else {
            // populate translations
            const resultTransUnits = Object.values(transUnitByMsgId).map(transUnit => {
              const transItem = translationById[transUnit.key];
              if (transItem) {
                transUnit.target = transItem.target;
                transUnit.target_parts = transItem.target_parts ?? [];
                transUnit.target_identifier = transItem.target_identifier;
                transUnit.state = transItem.state ?? 'needs-translation';
              }
              return transUnit;
            });
            result = {
              ...this.buildCallbackResultBase('xliff-file-loaded', command),
              xliffFile: file,
              sourceLangCode: sourceLocale,
              targetLangCode: tarLocale,
              transUnits: resultTransUnits,
            };
          }
        }
      }
      this.sendMessage('xliff-file-loaded', result);
    }).catch((err) => {
      const errMsg = `failed to read ${file}. Errors: ${err}`;
      result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
      this.sendMessage('xliff-file-loaded', result);
    });
  }

  loadTransUnitCodeCtx(command: i18nWebView.LoadTransUnitCodeContextCommand) {
    // TODO: seems like not needed anymore
  }

  updateTransUnit(command: i18nWebView.TransUnitUpdateCommand) {
    const targetXliff = FileUtils.getCorrespondingTranslationFile(command.xliffFile, command.targetLocale);
    let manager = G_TransUnitUpdateManagerDict[targetXliff];
    if (!manager) {
      let error: string | null = null;
      if (existsSync(targetXliff)) {
        const targetXliffContent = readFileSync(targetXliff, {encoding: 'utf8'});
        const {sourceLocale, targetLocale} = Xliff.loadFileLocaleInfo(targetXliffContent, '');
        if (command.sourceLocale !== sourceLocale) {
          error = `Unable to save trans units into '${targetXliff}': source locale is not match, actual: ${sourceLocale}, expected: ${command.sourceLocale}`;
        } else if (command.targetLocale !== targetLocale) {
          error = `Unable to save trans units into '${targetXliff}': target locale is not match, actual: ${targetLocale}, expected: ${command.targetLocale}`;
        }
        if (error) {
          const result = this.buildErrorCallbackResult('trans-unit-updated', command, error) as any;
          this.sendMessage('trans-unit-updated', result);
          return;
        }
      }
      G_TransUnitUpdateManagerDict[targetXliff] = manager = new EditorTransUnitUpdateTaskManager(command.sourceLocale, command.targetLocale, targetXliff);
    }
    manager.pushCommand(
      command,
      (result: i18nWebView.TransUnitUpdateResult) => {
        this.sendMessage('trans-unit-updated', result);
      },
      (result: i18nWebView.TransUnitOmittedResult) => {
        this.sendMessage('trans-unit-omitted', result);
      },
    );
  }

  revealCodeCtx(command: i18nWebView.CodeContextRevealCommand) {
    const baseDir = vscode.workspace.rootPath;
    let codeFileLocation = path.resolve(baseDir!, command.file);
    exists(codeFileLocation, (exists: boolean) => {
      if (exists) {
        const codeFileUri = vscode.Uri.parse(codeFileLocation);
        vscode.workspace.openTextDocument(codeFileUri).then(
          (doc) => {
            vscode.window.showTextDocument(doc, this.activeCodeRevealEditor?.viewColumn ?? vscode.ViewColumn.Beside).then(
              editor => {
                this.activeCodeRevealEditor = editor;
                const block = command.blocks[0];
                const line = editor.document.lineAt(block.start - 1);
                let keywordRange: vscode.Range | null = null;
                if (block.needle) {
                  try {
                    // searching keyword
                    const searchNeedle = StringUtils.isIdFromDigest(block.needle) ? ` i18n` : `@@${block.needle}`;
                    keywordRange = this.locateKeywordInDocument(searchNeedle, line, editor.document);
                    if (!keywordRange) {
                      const errMsg = `failed to locate the key '${block.needle}' in '${command.file}'.`;
                      this.handleCodeCtxRevealFailed(command, errMsg);
                    }
                  } catch (e) {
                    const errMsg = `failed to reveal code context for '${command.file}': ${e.toString()}. [@locateKeywordInDocument]`;
                    this.handleCodeCtxRevealFailed(command, errMsg);
                  }
                }
                vscode.commands
                  .executeCommand('revealLine', {lineNumber: line.lineNumber, at: 'center'})
                  .then(
                    () => {
                      editor.setDecorations(lineDecoration, [{range: line.range}]);
                      if (keywordRange && !editor.selection.isEqual(keywordRange)) {
                        editor.selections = [new vscode.Selection(keywordRange.start, keywordRange.end)];
                        editor.revealRange(editor.selection, vscode.TextEditorRevealType.InCenter);
                        editor.setDecorations(keyDecoration, [{range: keywordRange}]);
                      }
                      const result: i18nWebView.CodeContextRevealResultEvent = this.buildCallbackResultBase('code-ctx-revealed', command) as any;
                      this.sendMessage('code-ctx-revealed', result);
                    },
                    (err) => {
                      const errMsg = `failed to reveal code context for '${command.file}': ${err.toString()}. [@revealLine]`;
                      this.handleCodeCtxRevealFailed(command, errMsg);
                    }
                  );
              },
              (err) => {
                const errMsg = `failed to reveal code context for '${command.file}': ${err.toString()}. [@showTextDocument]`;
                this.handleCodeCtxRevealFailed(command, errMsg);
              }
            );
          },
          (err) => {
            const errMsg = `failed to reveal code context for '${command.file}': ${err.toString()}. [@openTextDocument]`;
            this.handleCodeCtxRevealFailed(command, errMsg);
          }
        );
      } else {
        const errMsg = `failed to reveal code context for '${command.file}': file not exists.`;
        this.handleCodeCtxRevealFailed(command, errMsg);
      }
    });
  }

  private handleCodeCtxRevealFailed(command: i18nWebView.CodeContextRevealCommand, message: string) {
    const result = this.buildErrorCallbackResult('code-ctx-revealed', command, message) as any;
    this.sendMessage('code-ctx-revealed', result);
  }

  private locateKeywordInDocument(keyword: string, line: vscode.TextLine, doc: vscode.TextDocument): vscode.Range | null {
    for (let l = line.lineNumber; l > 0; l--) {
      const tarLine = doc.lineAt(l);
      const keywordPos = tarLine.text.indexOf(keyword);
      if (keywordPos === -1) {
        continue;
      }
      const startPos = new vscode.Position(l, keywordPos);
      const endPos = new vscode.Position(l, keywordPos + keyword.length);
      const range = new vscode.Range(startPos, endPos);
      return range;
    }
    return null;
  }

  private sendMessage<K extends i18nWebView.CommandName>(type: K, message: i18nWebView.I18nTranslateWebViewCommandMap[K]) {
    this.webview.postMessage({
      command: type,
      data: message
    });
  }

  private buildCallbackResultBase(
    commandName: i18nWebView.CommandName,
    source: ExtEventBase,
    time: Date = new Date()
  ): ExtResultCallbackEvent {
    const result: ExtResultCallbackEvent = {
      time: time,
      hash: time.getTime().toString(),
      commandHash: source.hash,
      commandName: commandName,
      success: true
    };
    return result;
  }

  private buildErrorCallbackResult(
    commandName: i18nWebView.CommandName,
    event: ExtEventBase,
    errorMessage: string,
    errorCode: number = 0
  ): ExtResultCallbackEvent {
    const now = new Date();
    const result = this.buildCallbackResultBase(commandName, event, now);
    result.success = false;
    result.error = {
      code: errorCode,
      message: errorMessage,
    };
    return result;
  }
}
