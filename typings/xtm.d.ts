

// xtm definitions
declare namespace xtm {

  interface IXTMFile {
    version: string;
    sourceLocale: string;
    body: IBody
  }

  interface IBody {
    memoryCells: IMemoryCell[];
  }

  interface IMemoryCell {
    sourceIdentifier: string;
    localeTargetGroups: ILocaleTarget[];
  }

  interface ILocaleTarget {
    locale: string;
    memoryUnits: IMemoryUnit[];
  }

  interface IMemoryUnit {
    target: string;
    identifier: string;
    state: i18n.TranslationStateType
    key: string;
    description?: string | null;
    meaning?: string | null;
  }

}