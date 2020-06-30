
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { EditorCommandHanlder } from './command-handler';



export class EditorWebViewCommander {
    private currentPanel: vscode.WebviewPanel | undefined = undefined;
    private commandHandler: EditorCommandHanlder | undefined = undefined;

    public readonly panelName = 'ngI18nEditor';
    public readonly panelTitle = 'Angular I18n Xliff Editor';

    constructor() { }

    public command(
        ctx: vscode.ExtensionContext,
        setting: INgI18nExtSetting
    ) {
        const columnToShownIn = vscode.window.activeTextEditor ?
            vscode.window.activeTextEditor.viewColumn :
            undefined;
        if (this.currentPanel) {
            this.currentPanel.reveal(columnToShownIn);
        } else {

            let panel = vscode.window.createWebviewPanel(
                this.panelName, this.panelTitle, vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [
                        vscode.Uri.file(path.join(ctx.extensionPath, 'libs')),
                        vscode.Uri.file(path.join(ctx.extensionPath, 'out', 'editor'))
                    ]
                }
            );

            const parsedHtml = this.buildWebViewHtml(panel, ctx, setting);

            panel.webview.html = parsedHtml;


            this.commandHandler = new EditorCommandHanlder(panel.webview);
            panel.webview.onDidReceiveMessage((message: i18nWebView.I18nTranslateWebViewMessage<i18nWebView.CommandName>) => {
                try {
                    this.commandHandler?.handle(message.command, message.data);
                } catch (e) {
                    console.error(e);
                }
            }, undefined, ctx.subscriptions);

            panel.onDidDispose(() => {
                this.cleanObjects();
            }, null, ctx.subscriptions);

            this.currentPanel = panel;
        }
    }

    private buildWebViewHtml(
        panel: vscode.WebviewPanel,
        ctx: vscode.ExtensionContext,
        setting: INgI18nExtSetting
    ) {
        const vueJsSrc = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(ctx.extensionPath, 'libs', 'vue', '2.6.11', 'vue.js')
        ));
        const vueAntdCssSrc = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(ctx.extensionPath, 'libs', 'ant-design-vue', '1.6.2', 'antd.min.css')
        ));
        const vueAntdJsSrc = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(ctx.extensionPath, 'libs', 'ant-design-vue', '1.6.2', 'antd.js')
        ));
        const momentJsSrc = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(ctx.extensionPath, 'libs', 'moment', '2.27.0', 'moment-with-locales.min.js')
        ));
        const mainJsSrc = panel.webview.asWebviewUri(vscode.Uri.file(
            path.join(ctx.extensionPath, 'out', 'editor', 'main.js')
        ));


        const htmlFilePath = vscode.Uri.file(path.join(ctx.extensionPath, 'out', 'editor', 'index.html'));
        const html = fs.readFileSync(htmlFilePath.fsPath, 'utf8');

        const parsedHTML = html
            .replace('#main#', mainJsSrc.toString())
            .replace('#vueJsSrc#', vueJsSrc.toString())
            .replace('#vueAntdCssSrc#', vueAntdCssSrc.toString())
            .replace('#vueAntdJsSrc#', vueAntdJsSrc.toString())
            .replace('#momentJsSrc#', momentJsSrc.toString());

        return parsedHTML;
    }

    private cleanObjects() {
        this.currentPanel = undefined;
        this.commandHandler = undefined;
    }
}