import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { FileUtils } from '../modules/common/file.util';
import { Xliff } from '../modules/xliff/xliff';
import { StringUtils } from '../modules/common/string.util';
import { EditorTransUnitUpdateTaskManager } from '../modules/task/transunit-task-manager';
import { ExtensionSettingManager, IExtChangedEventSubscription } from '../modules/setting/ext-setting-manager';
import { ObjectUtils } from '../modules/common/object.util';

const lineDecoration = vscode.window.createTextEditorDecorationType({
  isWholeLine: true,
  borderWidth: `0 0 1px 0`,
  borderStyle: `dashed`, //TODO: file bug, this shouldn't throw a lint error.
  borderColor: `red`
});

const keyDecoration = vscode.window.createTextEditorDecorationType({
  outline: '4px double green'
});



export class EditorCommandHandler implements vscode.Disposable {

  private activeCodeRevealEditor!: vscode.TextEditor;
  private setting!: INgI18nExtSetting;

  private settingChangeSub: IExtChangedEventSubscription | undefined;
  private _vs_subscriptions: vscode.Disposable[] = [];
  private _file_watchers: vscode.FileSystemWatcher[] = [];
  private _watched_message_dict: {
    [location: string]: {
      path: string;
      mtime: number;
      targetByLocale: {
        [locale: string]: {
          path: string;
          mtime: number;
        }
      }
    }
  } = {};

  private static readonly commandResultMap = {
    'list-xliff-files': 'list-xliff-files-loaded',
    'load-xliff-file': 'xliff-file-loaded',
    'load-trans-unit-code-ctx': 'trans-unit-code-ctx-loaded',
    'update-trans-unit': 'trans-unit-updated',
    'reveal-code-ctx': 'code-ctx-revealed',
  };

  constructor(
    private readonly webview: vscode.Webview,
  ) {
    this.init();
  }

  private init() {
    const settingManager = ExtensionSettingManager.getInstance();
    this.settingChangeSub = settingManager.onSettingDidChange((cur) => {
      this.setting = cur;
    });
    this.setting = settingManager.setting;
  }

  initFileWatchers(sourceFile: vscode.Uri, targetFile: vscode.Uri, sourceMtime: number, sourceLocale: string, targetLocale: string) {
    this.disposeFileWatchers();
    const srcRelPath = vscode.workspace.asRelativePath(sourceFile);
    const srcWatcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(vscode.workspace.workspaceFolders![0], srcRelPath), true, false, true
    );

    const eventBase: Partial<i18nWebView.XliffFileUpdatedEvent> = {
      canIgnoreEditorReload: false,
      sourceFile: sourceFile.toString(),
      targetFile: targetFile.toString(),
      sourceLocale: sourceLocale,
      targetlocale: targetLocale,
    };

    srcWatcher.onDidChange((e) => {

      vscode.workspace.fs.stat(e).then(
        (s) => {
          if (s.mtime > sourceMtime) {
            // source file changed, should reload
            this.sendXliffUpdatedEvent(eventBase, 'source');
          }
        },
        (err) => {
          console.warn(`[EditorCommandHandler] failed to get file stat: ${err}, file: ${e.toString()};`);
        }
      );

    }, this._vs_subscriptions);


    const tarRelPath = vscode.workspace.asRelativePath(targetFile);
    const tarWatcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(vscode.workspace.workspaceFolders![0], tarRelPath), true, false, true
    );
    tarWatcher.onDidChange((e) => {
      vscode.workspace.fs.stat(e).then(
        (s) => {
          EditorTransUnitUpdateTaskManager.getManager(sourceLocale, targetLocale, targetFile).then(manager => {
            if (manager.lastWriteTime < s.mtime) {
              this.sendXliffUpdatedEvent(eventBase, 'target');
            }
          }, (err) => {
            console.warn(`[EditorCommandHandler] failed to get transunit task manager while target xliff changed: ${err}`);
          });
        },
        (err) => {
          console.warn(`[EditorCommandHandler] failed to get file stat: ${err}, file: ${e.toString()};`);
        }
      );

    }, this._vs_subscriptions);

    this._file_watchers = [srcWatcher, tarWatcher];
  }

  public sendXliffUpdatedEvent(eventBase: Partial<i18nWebView.XliffFileUpdatedEvent>, updateTarget: 'source' | 'target') {
    const e: i18nWebView.XliffFileUpdatedEvent = {
      ...this.buildEventBase(),
      ...eventBase,
      updateTarget: updateTarget
    } as any;
    this.sendMessage('xliff-file-updated', e);

  }

  dispose() {
    if (this.settingChangeSub) {
      this.settingChangeSub.unsubscribe();
    }
    this.disposeFileWatchers();
  }

  private disposeFileWatchers() {
    if (this._file_watchers.length > 0) {
      this._file_watchers.forEach(w => {
        try { w.dispose(); } catch { }
      });
      this._file_watchers = [];
    }
  }

  handle<K extends i18nWebView.CommandName>(command: K, message: i18nWebView.I18nTranslateWebViewCommandMap[K]) {
    console.log(`command received: ${command}`, message);
    const handlerName = command.split('-')
      .map((val, idx) => idx === 0 ? val : `${val[0].toUpperCase()}${val.substring(1)}`)
      .join('');
    const handler = (this as any)[handlerName] as Function;
    const callbackCmd = (EditorCommandHandler.commandResultMap as any)[command];
    if (typeof handler === 'function') {
      try {
        handler.apply(this, [message]);
      } catch (e) {
        const errMsg = `handler execution failed: ${e}`;
        if (callbackCmd) {
          const error = this.buildErrorCallbackResult(command, message, errMsg, -2);
          this.sendMessage(callbackCmd, error as any);
        } else {
          throw new Error(errMsg);
        }
      }
    } else {
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
          path: vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, i).toString()
        };
      }),
    };
    this.sendMessage('list-xliff-files-loaded', result);
  }

  loadXliffFile(command: i18nWebView.LoadXliffFileCommand) {
    const tarLocale = command.locale;
    const targetXliff = FileUtils.getCorrespondingTranslationFile(command.xliffFile, tarLocale, this.setting.editor.translationFileNamePattern);

    const fileUri = vscode.Uri.parse(command.xliffFile);
    const targetUri = vscode.Uri.parse(targetXliff);

    const tarContentPromise = new Promise<string | Uint8Array>((resovle, reject) => {
      vscode.workspace.fs.stat(targetUri).then(() => {
        vscode.workspace.fs.readFile(targetUri).then((data) => {
          resovle(data);
        }, (err) => {
          reject(err);
        });
      }, () => { resovle('NOT-EXISTS'); });
    });

    Promise.all(
      [
        vscode.workspace.fs.readFile(fileUri),
        tarContentPromise,
        vscode.workspace.fs.stat(fileUri),
      ]
    ).then((fileReadResults) => {
      let sourceContent = new TextDecoder('utf8').decode(fileReadResults[0]);
      let targetContent = (fileReadResults[1] instanceof Uint8Array) ?
        new TextDecoder('utf8').decode(fileReadResults[1]) :
        fileReadResults[1];
      let result: i18nWebView.LoadXliffFileResultEvent;
      const { transUnitByMsgId, errors, sourceLocale } = Xliff.loadTransUnits(sourceContent, '');
      if (errors && errors.length > 0 || !sourceLocale) {
        const errMsg = `failed to load trans units from ${fileUri.fsPath}. Errors: ${errors?.join('; ')}`;
        result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
      } else {
        let hasError = false;
        let resultTransUnits: i18n.TransUnit[] = [];
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
            hasError = true;
          } else if (tSourceLocale !== sourceLocale) {
            const errMsg = `the translation file source locale is not match. actual: ${tSourceLocale}, expected: ${sourceLocale}`;
            result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
            hasError = true;
          } else if (tTargetLocale !== tarLocale) {
            const errMsg = `the translation file target locale is not match. actual: ${tTargetLocale}, expected: ${tarLocale}`;
            result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
            hasError = true;
          } else {
            // populate translations
            resultTransUnits = Object.values(transUnitByMsgId).map(transUnit => {
              const transItem = translationById[transUnit.key];
              if (transItem) {
                transUnit.target = transItem.target;
                transUnit.target_parts = transItem.target_parts ?? [];
                transUnit.target_identifier = transItem.target_identifier;
                transUnit.state = transItem.state ?? 'needs-translation';
                // detect signed-off items and see if further action is needed.
                if (transUnit.state === 'signed-off') {
                  // compare transunit source
                  const srcItem = {
                    identifer: transUnit.source_identifier,
                    meaning: transUnit.meaning,
                    description: transUnit.description,
                    context: transUnit.contextGroups.sort((a, b) => {
                      const cA = `${a.sourceFile}#${a.lineNumber}`;
                      const cB = `${b.sourceFile}#${b.lineNumber}`;
                      return cA.localeCompare(cB);
                    }),
                  };
                  const tarItem = {
                    identifer: transItem.source_identifier,
                    meaning: transItem.meaning,
                    description: transItem.description,
                    context: transItem.contextGroups.sort((a, b) => {
                      const cA = `${a.sourceFile}#${a.lineNumber}`;
                      const cB = `${b.sourceFile}#${b.lineNumber}`;
                      return cA.localeCompare(cB);
                    }),
                  };

                  const diffs = ObjectUtils.diff(srcItem, tarItem);
                  if (diffs.length > 0) {
                    // let hasContextDiff = false;
                    // let hasMainFieldDiff = false;
                    // diffs.forEach(dItem => {
                    //   if (dItem.path.startsWith('context')) {
                    //     hasContextDiff = true;
                    //   } else {
                    //     hasMainFieldDiff = true;
                    //   }
                    // });
                    transUnit.state = 'translated'; // unlock the signed-off state
                  }
                }
              } else {                
                transUnit.state = 'needs-translation';
              }
              return transUnit;
            });
          }
        } else {
          resultTransUnits = Object.values(transUnitByMsgId).map(v => { 
            v.state = 'needs-translation';
            return v;
          });
        }
        if (!hasError) {
          result = {
            ...this.buildCallbackResultBase('xliff-file-loaded', command),
            xliffFile: fileUri.toString(),
            sourceLangCode: sourceLocale,
            targetLangCode: tarLocale,
            transUnits: resultTransUnits,
          };

          this.initFileWatchers(fileUri, targetUri, fileReadResults[2].mtime, sourceLocale, tarLocale);
        }
      }
      this.sendMessage('xliff-file-loaded', result!);
    }).catch((err) => {
      const errMsg = `failed to read ${fileUri.fsPath}. Errors: ${err}`;
      const result = this.buildErrorCallbackResult('xliff-file-loaded', command, errMsg) as any;
      this.sendMessage('xliff-file-loaded', result);
    });
  }

  loadTransUnitCodeCtx(command: i18nWebView.LoadTransUnitCodeContextCommand) {
    // TODO: seems like not needed anymore
  }

  updateTransUnit(command: i18nWebView.TransUnitUpdateCommand) {
    const targetXliff = FileUtils.getCorrespondingTranslationFile(command.xliffFile, command.targetLocale, this.setting.editor.translationFileNamePattern);
    const xliffUri = vscode.Uri.parse(targetXliff);
    EditorTransUnitUpdateTaskManager
      .getManager(command.sourceLocale, command.targetLocale, xliffUri)
      .then(
        (manager) => {
          manager.pushCommand(
            command,
            (result: i18nWebView.TransUnitUpdateResult) => {
              this.sendMessage('trans-unit-updated', result);
            },
            (result: i18nWebView.TransUnitOmittedResult) => {
              this.sendMessage('trans-unit-omitted', result);
            },
          );
        },
        (err: string) => {
          const result = this.buildErrorCallbackResult('trans-unit-updated', command, `[updateTransUnit]: ${err}`) as any;
          this.sendMessage('trans-unit-updated', result);
        }
      );
  }

  revealCodeCtx(command: i18nWebView.CodeContextRevealCommand) {
    const wsFolder = vscode.workspace.workspaceFolders![0].uri;

    let codeFileUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, command.file);
    vscode.workspace.fs.stat(codeFileUri).then(() => {
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
                .executeCommand('revealLine', { lineNumber: line.lineNumber, at: 'center' })
                .then(
                  () => {
                    editor.setDecorations(lineDecoration, [{ range: line.range }]);
                    if (keywordRange && !editor.selection.isEqual(keywordRange)) {
                      editor.selections = [new vscode.Selection(keywordRange.start, keywordRange.end)];
                      editor.revealRange(editor.selection, vscode.TextEditorRevealType.InCenter);
                      editor.setDecorations(keyDecoration, [{ range: keywordRange }]);
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
    }, () => {
      const errMsg = `failed to reveal code context for '${command.file}': file not exists.`;
      this.handleCodeCtxRevealFailed(command, errMsg);
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
      ...this.buildEventBase(time),
      commandHash: source.hash,
      commandName: commandName,
      success: true
    };
    return result;
  }

  private buildEventBase(time: Date = new Date()): ExtEventBase {
    return { time, hash: time.getTime().toString() };
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
