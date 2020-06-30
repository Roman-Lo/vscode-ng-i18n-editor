
declare namespace i18nWebView // i18n-webview
{
  interface ListXliffFilesCommand extends ExtEventBase {
    readonly dir: string;
  }

  interface ListXliffFilesResultEvent extends ExtResultCallbackEvent {
    readonly dir: string;
    readonly files: {
      name: string;
      path: string;
    }[];
  }

  interface LoadXliffFileCommand extends ExtEventBase {
    readonly xliffFile: string;
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


}