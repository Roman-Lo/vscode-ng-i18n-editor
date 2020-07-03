
declare namespace i18n {

  interface TranslationStateDict  {
    "new": 'N';
    "needs-translation": 'P';
    "translated": 'T';
    "signed-off": 'S';
  }

  type TranslationStateType = keyof TranslationStateDict;

  interface TransUnitContext {
    sourceFile: string;
    lineNumber: number;
  }

  interface TransUnit {
    key: string;
    description?: string | null;
    meaning?: string | null;

    source: string;
    source_identifier: string;
    source_parts: I18nHtmlPart[] | null;

    target?: string | null;
    target_identifier?: string | null;
    target_parts?: I18nHtmlPart[] | null;

    state?: TranslationStateType | null;
    contextGroups: TransUnitContext[];
  }

  interface I18nHtmlPart {
    key: string | null;
    type: 'text' | 'ph_tag';
    rawHtml: string;
    displayHtml: string;
    identifier: string;
  }
}