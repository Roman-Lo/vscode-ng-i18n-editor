/**
 * @license
 * Copyright (c) 2020 Roman-Lo. https://github.com/Roman-Lo
 *
 * Use of this source code is governed by an MIT-style license
 */


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { EditorWebViewBuilder } from './editor/webview-builder';
import { ExtensionSettingManager } from './modules/setting/ext-setting-manager';
import { CONST_EXTENSION_SETTING_FILE, CONST_TRANSUNIT_MEMORY_FILE_TYPE } from './constants';
import { ObjectUtils } from './modules/common/object.util';
import { TranslationMemoryManager } from './modules/xtm/translation-memory-manager';
import { FileUtils } from './modules/common/file.util';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "vscode-ng-i18n-editor" is active!');
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  configFileAssociations();
  ExtensionSettingManager.create(context).then(
    (settingManager) => {
      const builder = new EditorWebViewBuilder(settingManager);

      let view_subs = vscode.commands.registerCommand('vscode-ng-i18n-editor.openEditor', () => {
        builder.create(context);
      });

      let file_open_subs = vscode.workspace.onDidOpenTextDocument((e) => {
        if (e.fileName.search(/.(xlf|xliff)$/) >= 0) { // file matches
          const relPath = vscode.workspace.asRelativePath(e.fileName);
          if (settingManager.setting?.editor?.messageLocations?.indexOf(relPath) >= 0) {
            vscode.window.showInformationMessage(`This file can be view in '${builder.panelTitle}'`, {
              title: `Open ${builder.panelTitle}`
            }).then((result) => {
              if (result?.title === `Open ${builder.panelTitle}`) {
                builder.create(context, e.uri.toString());
              }
            });
          }
        }
      });

      context.subscriptions.push(
        view_subs, file_open_subs
      );
    }
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
}

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