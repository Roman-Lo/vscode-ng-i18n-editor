import * as vscode from 'vscode';
import * as path from 'path';
import { FileUtils } from '../modules/common/file.util';
import { Xliff } from '../modules/xliff/xliff';
import { StringUtils } from '../modules/common/string.util';
import { EditorTransUnitUpdateTaskManager } from '../modules/task/transunit-task-manager';
import { ExtensionSettingManager, IExtChangedEventSubscription } from '../modules/setting/ext-setting-manager';

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

  dispose() {
    if (this.settingChangeSub) {
      this.settingChangeSub.unsubscribe();
    }
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
          path: vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, i).toString()
        };
      }),
    };
    this.sendMessage('list-xliff-files-loaded', result);
  }

  loadXliffFile(command: i18nWebView.LoadXliffFileCommand) {
    const tarLocale = command.locale;
    const targetXliff = FileUtils.getCorrespondingTranslationFile(command.xliffFile, tarLocale);

    const fileUri = vscode.Uri.parse(command.xliffFile);
    const targetUri = vscode.Uri.parse(targetXliff);

    const tarContentPromise = new Promise<string | Uint8Array>((resovle, reject) => {
      vscode.workspace.fs.stat(targetUri).then(() => {
        vscode.workspace.fs.readFile(targetUri).then((data) => {
          resovle(data);
        }, (err) => {
          reject(err);
        });
      }, () => { resovle('NOT-EXISTS'); })
    });
    Promise.all(
      [
        vscode.workspace.fs.readFile(fileUri),
        tarContentPromise,
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
              }
              return transUnit;
            });
          }
        } else {
          resultTransUnits = Object.values(transUnitByMsgId);
        }
        if (!hasError) {
          result = {
            ...this.buildCallbackResultBase('xliff-file-loaded', command),
            xliffFile: fileUri.toString(),
            sourceLangCode: sourceLocale,
            targetLangCode: tarLocale,
            transUnits: resultTransUnits,
          };
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
    const targetXliff = FileUtils.getCorrespondingTranslationFile(command.xliffFile, command.targetLocale);
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
