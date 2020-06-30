// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { EditorWebViewCommander } from './editor/commander';

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
			translationSaveOn: 'blur'
		}
	};

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-ng-i18n-editor" is now active!');

	let viewsubs = vscode.commands.registerCommand('vscode-ng-i18n-editor.openEditor', () => {
		const commander = new EditorWebViewCommander();
		commander.command(
			context,
			defaultSetting
		);
	});

	context.subscriptions.push(
		viewsubs
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