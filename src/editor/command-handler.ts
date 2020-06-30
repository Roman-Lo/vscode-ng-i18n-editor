import * as vscode from 'vscode';

export class EditorCommandHanlder {

    private static readonly commandResultMap = {
        'list-xliff-files': 'list-xliff-files-loaded',
        'load-xliff-file': 'xliff-file-loaded',
        'load-trans-unit-code-ctx': 'trans-unit-code-ctx-loaded',
        'update-trans-unit': 'trans-unit-updated',
    };

    constructor(
        readonly webview: vscode.Webview
    ) {

    }

    handle<K extends i18nWebView.CommandName>(command: K, message: i18nWebView.I18nTranslateWebViewCommandMap[K]) {
        const handlerName = command.split('-')
            .map((val, idx) => idx === 0 ? val : `${val[0].toUpperCase()}${val.substring(1)}`)
            .join('');
        const handler = (this as any)[handlerName] as Function;
        const callbackCmd = (EditorCommandHanlder.commandResultMap as any)[command];
        if (typeof handler === 'function') {
            handler.apply(this, message);
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
        
    }

    loadXliffFile(command: i18nWebView.LoadXliffFileCommand) {

    }

    loadTransUnitCodeCtx(command: i18nWebView.LoadTransUnitCodeContextCommand) {

    }

    updateTransUnit(command: i18nWebView.TransUnitUpdateCommand) {

    }

    private sendMessage<K extends i18nWebView.CommandName>(type: K, message: i18nWebView.I18nTranslateWebViewMessage<K>) {
        this.webview.postMessage(message);
    }

    private buildErrorCallbackResult(
        commandName: i18nWebView.CommandName,
        event: ExtEventBase,
        errorMessage: string,
        errorCode: number = 0
    ) {
        const now = new Date();
        const result: ExtResultCallbackEvent = {
            time: now,
            hash: now.getTime().toString(),
            commandHash: event.hash,
            commandName: commandName,
            success: false,
            error: {
                code: errorCode,
                message: errorMessage,
            },
        };
        return result;
    }
}