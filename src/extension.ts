// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { EditorWebViewBuilder } from './editor/webview-builder';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let defaultSetting: INgI18nExtSetting = {
		tm: {
			enabled: false,
			mode: 'git',
			uri: '.ngI18nExt/ext.xtm'
		},
		dir: '.',
		editor: {
			translationSaveOn: 'blur',
			messageLocations: [
				'locale/apps-bundle.xlf'
			],
		}
	};

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-ng-i18n-editor" is now active!');

	const builder = new EditorWebViewBuilder();

	let viewsubs = vscode.commands.registerCommand('vscode-ng-i18n-editor.openEditor', () => {
		builder.create(
			context,
			defaultSetting
		);
	});

	let watchersubs = vscode.workspace.onDidSaveTextDocument((event) => {
		if (
			event.fileName.endsWith('.xlf') ||
			event.fileName.endsWith('.xliff')
		) {
			builder.reload(context, defaultSetting);
		}
	});

	context.subscriptions.push(
		viewsubs, watchersubs
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }


function configFileAssociations() {
	const filesConfig = vscode.workspace.getConfiguration();
	filesConfig.update("files.associations", {
		"*.xtm": "xml",
		".ngi18nconfig": "json"
	}, vscode.ConfigurationTarget.Workspace).then(() => {
		console.log('Finished setting file associations.');
	});
}