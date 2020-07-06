interface ExtEventBase {
  readonly time: Date;
  readonly hash: string;
}

interface ExtResultCallbackEvent extends ExtEventBase {
  readonly commandHash: string;
  readonly commandName: string;
  success: boolean;
  error?: { code: number; message: string; };
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

interface II18nEditorTaskConfig {
  /**
   * the frequency of task checking
   * (default 5 seconds)
   * @type {number}
   * @memberof I18nEditorTaskConfig
   */
  intervalSeconds?: number;
  /**
   * the maximum command size for each task execution
   * (default 10)
   * @type {number}
   * @memberof I18nEditorTaskConfig
   */
  itemEachPack?: number;
}

interface II18nEditorSetting {
  /**
   * defaults: "blur"
   *
   * @type {('blur' | 'change' | 'manual')}
   */
  translationSaveOn: 'blur' | 'change' | 'manual';
  /**
   * message locations
   *
   * @type {string[]}
   * @memberof II18nEditorSetting
   */
  messageLocations: string[];

  taskConfig?: II18nEditorTaskConfig | null;
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
  // dir: string;
  /**
   * the target locales
   *
   * @type {string[]}
   * @memberof INgI18nExtSetting
   */
  locales: string[];
  tm: ITranslationMemorySetting;
  editor: II18nEditorSetting;
}

declare function acquireVsCodeApi(): any;

declare function loadScriptOrStyle(type: 'script' | 'style', src: string, cb: () => void): void;

declare function acquireVsCodeApi(): void;

declare module "*.html" {
  const content: string;
  export default content;
}