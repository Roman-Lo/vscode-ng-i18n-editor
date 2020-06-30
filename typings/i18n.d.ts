
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
    description: string;
    meaning: string;

    source: string;
    source_identifier: string;

    target?: string;
    target_identifier?: string;

    state?: TranslationStateType;
    contextGroups: TransUnitContextGroup[];
  }
}