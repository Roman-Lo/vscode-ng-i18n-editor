// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { EditorWebViewBuilder } from './editor/webview-builder';
import { ExtensionSettingManager } from './modules/setting/ext-setting-manager';
import { CONST_EXTENSION_SETTING_FILE, CONST_TRANSUNIT_MEMORY_FILE_TYPE } from './constants';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "vscode-ng-i18n-editor" is active!');
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	configFileAssociations();
	ExtensionSettingManager.create(context).then(
		(settingManager) => {
			const builder = new EditorWebViewBuilder();

			let viewsubs = vscode.commands.registerCommand('vscode-ng-i18n-editor.openEditor', () => {
				builder.create(context, settingManager.setting);
			});

			let watchersubs = vscode.workspace.onDidSaveTextDocument((event) => {
				if (
					event.fileName.endsWith('.xlf') ||
					event.fileName.endsWith('.xliff')
				) {
					builder.reload(context, settingManager.setting);
				}
			});

			context.subscriptions.push(
				viewsubs, watchersubs
			);
		}
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }


function configFileAssociations() {
	const filesConfig = vscode.workspace.getConfiguration();
	const filesAssociationsConfig = filesConfig.get<{ [name: string]: string }>('files.associations') ?? {};
	if (filesAssociationsConfig[CONST_TRANSUNIT_MEMORY_FILE_TYPE] !== "xml" || filesAssociationsConfig[CONST_EXTENSION_SETTING_FILE] !== "json") {
		filesAssociationsConfig[CONST_TRANSUNIT_MEMORY_FILE_TYPE] = "xml";
		filesAssociationsConfig[CONST_EXTENSION_SETTING_FILE] = "json";
		filesConfig.update("files.associations", {
			[CONST_TRANSUNIT_MEMORY_FILE_TYPE]: "xml",
			[CONST_EXTENSION_SETTING_FILE]: "json"
		}, vscode.ConfigurationTarget.Workspace).then(() => {
			console.log('Finished setting file associations.');
		});
	}
}