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
    readonly transUnits: i18n.TransUnit[];
  }

  interface TransUnitUpdateResult extends ExtResultCallbackEvent {
    readonly xliffFile: string;
    readonly transUnits: i18n.TransUnit[];
    readonly errors: { [key: string]: string };
  }

  interface XliffFileUpdatedEvent extends ExtEventBase {
    readonly triggerBy: string;
    readonly xliffFile: string;
    readonly sourceLangCode: string;
    readonly targetLangCode: string;
    readonly transUnits: i18n.TransUnit[];
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

  interface I18nTranslateWebViewCommandMap {
    "list-xliff-files": ListXliffFilesCommand;
    "list-xliff-files-loaded": ListXliffFilesResultEvent;

    "load-xliff-file": LoadXliffFileCommand;
    "xliff-file-loaded": LoadXliffFileResultEvent;

    "load-trans-unit-code-ctx": LoadTransUnitCodeContextCommand;
    "trans-unit-code-ctx-loaded": LoadTransUnitCodeContextResultEvent;

    "update-trans-unit": TransUnitUpdateCommand;
    "trans-unit-updated": TransUnitUpdateResult;

    "xliff-file-updated": XliffFileUpdatedEvent;

    "context": any;
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
    __key_for_search__: string;
  }

  interface IWebViewEditingUnitState {
    key: string;
    editorValue: string;
    availableTags: string[];
    allTags: string[];
    error: string | null;
    ref: ITransUnitView;
  }

  interface IWebViewTransUnitTableData {
    sourceLocale: string;
    targetLocale: string;
    editingUnit: IWebViewEditingUnitState | null,
    columns: { [key: string]: any }[];
    transUnits: ITransUnitView[];
    loaded: boolean;
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
    selectedXliffFile: string | null;
    selectedTargetLocale: string | null;
    xliffFileLoading: boolean;
    searchOptions: {
      key: string | null;
      state: i18n.TranslationStateType | 'all';
      pageSize: number;
      pageNum: number;
    }
    transUnitTable: IWebViewTransUnitTableData;
    pagination: {
      totalAmount: number;
      pageSize: number;
      pageNum: number;
    };
    // counters?: {
    //   needHandle: number;
    //   translated: number;
    // }
  }

}