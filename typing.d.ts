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

  /**
   * translation file location pattern, the default value is '${name}(${lang}-${region})'.
   * Which, 
   *  * `${name}`: stands for the source xliff file name;
   *  * `${lang}`: stands for the language;
   *  * `${region}`： stands for the region where the language in use.
   * For example, for locale 'en-US', the `${lang}` is 'en', the `${region}` is `US`. 
   * You can specify your only translation file pattern to target your translation file.
   * @type {string}
   * @memberof II18nEditorSetting
   */
  translationFileNamePattern: string;

  /**
   * editor mode.
   *  * `default`: use the xliff specify in the `messageLocations` as source and auto generate the target translation xliff based on the given `translationFileNamePattern`;
   *  * `target-file`: edit directly on the target xliff (based on the `messageLocations` and the given `translationFileNamePattern`)
   *
   * @type {('default' | 'target-file')}
   * @memberof II18nEditorSetting
   */
  mode: 'default' | 'target-file';

  /**
   * determine how to handle empty translation.
   *  * `delete`: delete the trans unit in the target xliff when empty;
   *  * `keep`: keep the trans unit in the target xliff and mark as `need-translation`;
   *  * `fallback-to-source`: fill the translation target using the source string and mark as `need-translation`;
   * 
   * When editor is in `default` mode, this option is set `delete` as default;
   * When editor is in `target-file` mode, this option is set `fallback-to-source` as default;
   */
  emptyTranslationHandling: 'delete' | 'keep' | 'fallback-to-source';

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
   * The target LCID collection.
   * LCID is a string contains language code and region info, eg: 'zh-CN', 'en-US', 'ja-JP', 'th-TH', etc...
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