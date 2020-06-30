
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface vscode {
  postMessage(message: any): Thenable<boolean>;
}


interface ExtEventBase {
  readonly time: Date;
  readonly hash: string;
}

interface ExtResultCallbackEvent extends ExtEventBase {
  readonly commandHash: string;
  readonly commandName: string;
  readonly success: boolean;
  readonly error?: { code: number; message: string; };
}

interface ITranslationMemorySetting {
  enabled: boolean;
  /**
   * defaults: git
   *
   * @type {('git' | 'remote')}
   */
  mode: 'git' | 'remote';
  /**
   * defaults: 
   * = git: .ngI18nExt/ext.xtm
   *
   * @type {string}
   */
  uri: string;
}

interface II18nEditorSetting {
  /**
   * defaults: "blur"
   *
   * @type {('blur' | 'change' | 'manual')}
   */
  translationSaveOn: 'blur' | 'change' | 'manual';
}

/**
 * Angular i18n extension settings
 *
 * @interface INgI18nExtSetting
 */
interface INgI18nExtSetting {
  /**
   * defaults: "."
   *
   * @type {string}
   * @memberof II18nEditorSetting
   */
  dir: string;
  tm: ITranslationMemorySetting;
  editor: II18nEditorSetting;
}


declare var vscode: vscode;
declare var isInVsCodeIDE: boolean;

declare function loadScriptOrStyle(type: 'script' | 'style', src: string, cb: () => void): void;
declare function acquireVsCodeApi(): void;