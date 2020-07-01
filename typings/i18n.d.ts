
declare namespace i18n {

  type TranslationStateType =
    'new' |
    'needs-translation' |
    'translated' |
    'signed-off';

  interface TransUnitContextGroup {
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
    contextGroups: TransUnitContextGroup[];
  }

  interface I18nHtmlPart {
    key: string | null;
    type: 'text' | 'ph_tag';
    rawHtml: string;
    displayHtml: string;
    identifier: string;
  }
}