declare namespace i18nWebView // i18n-webview
{
  interface ListXliffFilesCommand extends ExtEventBase {
    readonly dir: string;
  }

  interface ListXliffFilesResultEvent extends ExtResultCallbackEvent {
    readonly dir: string;
    readonly locales: string[];
    readonly files: {
      name: string;
      path: string;
    }[];
  }

  interface LoadXliffFileCommand extends ExtEventBase {
    readonly xliffFile: string;
    readonly locale: string;
  }

  interface LoadXliffFileResultEvent extends ExtResultCallbackEvent {
    readonly xliffFile: string;
    readonly sourceLangCode: string;
    readonly targetLangCode: string;
    readonly transUnits: i18n.TransUnit[];
  }

  interface TransUnitUpdateCommand extends ExtEventBase {
    readonly xliffFile: string;
    readonly sourceLocale: string;
    readonly targetLocale: string;
    readonly transUnits: i18n.TransUnit[];
  }

  interface TransUnitUpdateResult extends ExtResultCallbackEvent {
    readonly xliffFile: string;
    readonly transUnits: i18n.TransUnit[];
    readonly errors: { [key: string]: string };
  }

  interface TransUnitOmittedResult extends ExtResultCallbackEvent {
    readonly xliffFile: string;
    readonly transUnitKey: string;
  }

  interface XliffFileUpdatedEvent extends ExtEventBase {
    readonly canIgnoreEditorReload: boolean;
    readonly sourceFile: string;
    readonly targetFile: string;
    readonly sourceLocale: string;
    readonly targetlocale: string;
    readonly updateTarget: 'source' | 'target';
  }

  interface LoadTransUnitCodeContextCommand extends ExtEventBase {
    readonly transUnit: i18n.TransUnit;
  }

  interface LoadTransUnitCodeContextResultEvent extends ExtResultCallbackEvent {
    readonly transUnitKey: string;
    readonly fileGroups: {
      file: string,
      blocks: {
        start: number, lines: string[]
      }[]
    }[];
  }

  interface CodeContextRevealCommand extends ExtEventBase {
    readonly file: string;
    readonly blocks: {
      /**
       * hightlight if defined
       *
       * @type {string}
       */
      needle?: string,
      start: number;
      /**
       * -1 as not defined
       *
       * @type {number}
       */
      end: number;
    }[];
  }

  interface CodeContextRevealResultEvent extends ExtResultCallbackEvent {
    readonly file: string;
  }

  interface I18nTranslateWebViewCommandMap {
    "list-xliff-files": ListXliffFilesCommand;
    "list-xliff-files-loaded": ListXliffFilesResultEvent;

    "load-xliff-file": LoadXliffFileCommand;
    "xliff-file-loaded": LoadXliffFileResultEvent;

    "load-trans-unit-code-ctx": LoadTransUnitCodeContextCommand;
    "trans-unit-code-ctx-loaded": LoadTransUnitCodeContextResultEvent;

    "update-trans-unit": TransUnitUpdateCommand;
    "trans-unit-updated": TransUnitUpdateResult;
    'trans-unit-omitted': TransUnitOmittedResult;

    "xliff-file-updated": XliffFileUpdatedEvent;

    "reveal-code-ctx": CodeContextRevealCommand;
    "code-ctx-revealed": CodeContextRevealResultEvent;

  }

  type CommandName = keyof I18nTranslateWebViewCommandMap;

  interface I18nTranslateWebViewMessage<K extends CommandName> {
    readonly command: K;
    readonly data: I18nTranslateWebViewCommandMap[K];
  }

  interface ITransUnitView extends i18n.TransUnit {
    _updating: boolean;
    _commandHash: string | null;
    _error?: string | null;
    _locked?: boolean;
    __signoff_hovered?: boolean;
    __key_for_search__: string;
    __key_for_search_target__: string;
  }

  interface IWebViewEditorTagMeta {
    tag: string;
    count: number;
  }

  interface IWebViewTagAnalyzeResult {
    pairs: {
      [name: string]: {
        startTag: string;
        closeTag: string;
        startCount: number;
        closeCount: number;
      }
    };
    standalones: { [name: string]: number };
  }

  interface IWebViewEditingUnitState {
    key: string;
    editorValue: string;
    availableTags: IWebViewEditorTagMeta[];
    allTags: IWebViewEditorTagMeta[];
    errors: string[] | null;
    ref: ITransUnitView;
  }

  interface IWebViewTransUnitTableData {
    sourceXliffFile: string;
    sourceLocale: string;
    targetLocale: string;
    editingUnit: IWebViewEditingUnitState | null,
    columns: { [key: string]: any }[];
    transUnits: ITransUnitView[];
    loaded: boolean;
    filtering: boolean;
  }

  interface IWebViewTableFilter {
    sourceKeyword: string | null;
    targetKeyword: string | null;
    state: i18n.TranslationStateType[];
  }

  interface IWebViewStatusBar {
    counters: {
      needHandleCount: number;
      signedOffUnitCount: number;
      totalUnitCount: number;
    };
    process: {
      commandByHash: {
        [hash: string]: {
          message: string;
          cmd: any;
          error: string | null;
        }
      };
      finished: boolean;
      hasError: boolean;
    };
  }

  interface IWebViewPageData {
    settings: {
      mode: 'git-control' | 'db-control';
      translationSaveOn: 'blur' | 'change' | 'manual';
    };
    xliffFiles: {
      name: string;
      path: string;
    }[];
    locales: string[];
    transStateOptions: {
      [key: string]: {
        state: i18n.TranslationStateType,
        name: string;
        abbr: string;
      }
    };
    selectedXliffFile: string | null;
    selectedTargetLocale: string | null;
    messageListed: boolean;
    xliffFileLoading: boolean;
    filterOptions: IWebViewTableFilter;
    transUnitTable: IWebViewTransUnitTableData;
    pagination: {
      totalAmount: number;
      pageSize: number;
      pageNum: number;
      numOfPage: number;
    };
    statusBar: IWebViewStatusBar;
  }

}
