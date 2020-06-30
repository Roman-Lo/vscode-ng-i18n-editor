export const MOCK_DATA: i18nWebView.IWebViewPageData = {
  xliffFiles: [
    {
      name: 'locale/apps-bundle.xlf',
      path: 'fake',
    }
  ],
  locales: [
    'en-US'
  ],
  selectedXliffFile: null,
  selectedTargetLocale: null,
  xliffFileLoading: false,
  settings: {
    mode: 'git-control',
    translationSaveOn: 'blur',
  },
  searchOptions: {
    key: null,
    state: 'all',
    pageNum: 1,
    pageSize: 10,
  },
  transUnitTable: {
    sourceLocale: 'zh-CN',
    targetLocale: 'en-US',
    columns: [],
    transUnits: [
      {
        key: 'Text_test',
        source: '测试',
        source_identifier: '测试',
        contextGroups: [],
        _updating: false,
        _commandHash: null,
        __key_for_search__: '',
      },
      {
        key: 'Text_test2',
        source: '测试2',
        source_identifier: '测试2',
        target: 'Text2',
        contextGroups: [],
        _updating: false,
        _commandHash: null,
        __key_for_search__: '',
      }
    ],
    loaded: false,
  },
  pagination: {
    totalAmount: 0,
    pageNum: 1,
    pageSize: 10,
  }
};