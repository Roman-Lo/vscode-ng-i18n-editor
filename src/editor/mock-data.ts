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
  transStateOptions: {
    'new': {
      state: 'new',
      name: 'New',
      abbr: 'N',
    },
    'needs-translation': {
      state: 'needs-translation',
      name: 'Need translation',
      abbr: 'P',
    },
    'translated': {
      state: 'translated',
      name: 'Translated',
      abbr: 'T',
    },
    'signed-off': {
      state: 'signed-off',
      name: 'Signed off',
      abbr: 'S',
    },
  },
  selectedXliffFile: null,
  selectedTargetLocale: null,
  xliffFileLoading: false,
  settings: {
    mode: 'git-control',
    translationSaveOn: 'blur',
  },
  filterOptions: {
    sourceKeyword: null,
    targetKeyword: null,
    state: ['new', 'needs-translation', 'signed-off', 'translated'],
  },
  transUnitTable: {
    sourceXliffFile: '',
    sourceLocale: 'zh-CN',
    targetLocale: 'en-US',
    columns: [],
    editingUnit: null,
    transUnits: [
      {
        "contextGroups": [
          {
            "lineNumber": 6,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": "目的地",
        "key": "Text_Label_Destination",
        "meaning": null,
        "source": "目的地",
        "source_identifier": "目的地",
        "source_parts": [
          {
            "displayHtml": "目的地",
            "identifier": "目的地",
            "key": null,
            "rawHtml": "目的地",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Destination",
        "target_identifier": "Destination",
        "target_parts": [
          {
            "displayHtml": "Destination",
            "identifier": "Destination",
            "key": null,
            "rawHtml": "Destination",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Label_Destination|~|目的地|~",
        "__key_for_search_target__": "~|Destination|~|Destination|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 13,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": "就是搜索关键字的时候的东西",
        "key": "Text_Label_SearchByKeyword",
        "meaning": "搜关键字",
        "source": "搜关键字",
        "source_identifier": "搜关键字",
        "source_parts": [
          {
            "displayHtml": "搜关键字",
            "identifier": "搜关键字",
            "key": null,
            "rawHtml": "搜关键字",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Search By Keyword",
        "target_identifier": "Search By Keyword",
        "target_parts": [
          {
            "displayHtml": "Search By Keyword",
            "identifier": "Search By Keyword",
            "key": null,
            "rawHtml": "Search By Keyword",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Label_SearchByKeyword|~|搜关键字|~",
        "__key_for_search_target__": "~|Search By Keyword|~|Search By Keyword|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 18,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_SuggestionTypeahead_SearchUnderRegion",
        "meaning": null,
        "source": "只搜 <x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/><x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\"/><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/> 内",
        "source_identifier": "只搜 <START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> 内",
        "source_parts": [
          {
            "displayHtml": "只搜 ",
            "identifier": "只搜 ",
            "key": null,
            "rawHtml": "只搜 ",
            "type": "text"
          },
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": " 内",
            "identifier": " 内",
            "key": null,
            "rawHtml": " 内",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Only Search In <x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
        "target_identifier": "Only Search In <START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>",
        "target_parts": [
          {
            "displayHtml": "Only Search In ",
            "identifier": "Only Search In ",
            "key": null,
            "rawHtml": "Only Search In ",
            "type": "text"
          },
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
            "type": "ph_tag"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SuggestionTypeahead_SearchUnderRegion|~|只搜 <START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> 内|~",
        "__key_for_search_target__": "~|Only Search In <x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />|~|Only Search In <START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 42,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_SuggestionTypeahead_CitySiteHotel",
        "meaning": null,
        "source": "城市／地标／商圈／酒店",
        "source_identifier": "城市／地标／商圈／酒店",
        "source_parts": [
          {
            "displayHtml": "城市／地标／商圈／酒店",
            "identifier": "城市／地标／商圈／酒店",
            "key": null,
            "rawHtml": "城市／地标／商圈／酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "City/Landmark/District/Hotel",
        "target_identifier": "City/Landmark/District/Hotel",
        "target_parts": [
          {
            "displayHtml": "City/Landmark/District/Hotel",
            "identifier": "City/Landmark/District/Hotel",
            "key": null,
            "rawHtml": "City/Landmark/District/Hotel",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_SuggestionTypeahead_CitySiteHotel|~|城市／地标／商圈／酒店|~",
        "__key_for_search_target__": "~|City/Landmark/District/Hotel|~|City/Landmark/District/Hotel|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 64,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_SuggestionCategory_Region",
        "meaning": null,
        "source": "区域/商圈",
        "source_identifier": "区域/商圈",
        "source_parts": [
          {
            "displayHtml": "区域/商圈",
            "identifier": "区域/商圈",
            "key": null,
            "rawHtml": "区域/商圈",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Region",
        "target_identifier": "Region",
        "target_parts": [
          {
            "displayHtml": "Region",
            "identifier": "Region",
            "key": null,
            "rawHtml": "Region",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SuggestionCategory_Region|~|区域/商圈|~",
        "__key_for_search_target__": "~|Region|~|Region|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 68,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_SuggestionCategory_ViewPoint",
        "meaning": null,
        "source": "热门景点",
        "source_identifier": "热门景点",
        "source_parts": [
          {
            "displayHtml": "热门景点",
            "identifier": "热门景点",
            "key": null,
            "rawHtml": "热门景点",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "POI",
        "target_identifier": "POI",
        "target_parts": [
          {
            "displayHtml": "POI",
            "identifier": "POI",
            "key": null,
            "rawHtml": "POI",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SuggestionCategory_ViewPoint|~|热门景点|~",
        "__key_for_search_target__": "~|POI|~|POI|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 72,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_SuggestionCategory_Hotel",
        "meaning": null,
        "source": "酒店",
        "source_identifier": "酒店",
        "source_parts": [
          {
            "displayHtml": "酒店",
            "identifier": "酒店",
            "key": null,
            "rawHtml": "酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel",
        "target_identifier": "Hotel",
        "target_parts": [
          {
            "displayHtml": "Hotel",
            "identifier": "Hotel",
            "key": null,
            "rawHtml": "Hotel",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SuggestionCategory_Hotel|~|酒店|~",
        "__key_for_search_target__": "~|Hotel|~|Hotel|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 100,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          },
          {
            "lineNumber": 279,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-map/hotel-map.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_Hotel",
        "meaning": null,
        "source": "酒店",
        "source_identifier": "酒店",
        "source_parts": [
          {
            "displayHtml": "酒店",
            "identifier": "酒店",
            "key": null,
            "rawHtml": "酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel",
        "target_identifier": "Hotel",
        "target_parts": [
          {
            "displayHtml": "Hotel",
            "identifier": "Hotel",
            "key": null,
            "rawHtml": "Hotel",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_Hotel|~|酒店|~",
        "__key_for_search_target__": "~|Hotel|~|Hotel|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 104,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_Airport",
        "meaning": null,
        "source": "机场",
        "source_identifier": "机场",
        "source_parts": [
          {
            "displayHtml": "机场",
            "identifier": "机场",
            "key": null,
            "rawHtml": "机场",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Airport",
        "target_identifier": "Airport",
        "target_parts": [
          {
            "displayHtml": "Airport",
            "identifier": "Airport",
            "key": null,
            "rawHtml": "Airport",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_Airport|~|机场|~",
        "__key_for_search_target__": "~|Airport|~|Airport|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 108,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_SuggestionTypeahead_Nearby",
        "meaning": null,
        "source": "附近约<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/><x id=\"INTERPOLATION\" equiv-text=\"{{ option.source.Metadata.HotelCount }}\"/><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>间酒店",
        "source_identifier": "附近约<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>间酒店",
        "source_parts": [
          {
            "displayHtml": "附近约",
            "identifier": "附近约",
            "key": null,
            "rawHtml": "附近约",
            "type": "text"
          },
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ option.source.Metadata.HotelCount }}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "间酒店",
            "identifier": "间酒店",
            "key": null,
            "rawHtml": "间酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{ option.source.Metadata.HotelCount }}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> hotels nearby",
        "target_identifier": "<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> hotels nearby",
        "target_parts": [
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ option.source.Metadata.HotelCount }}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " hotels nearby",
            "identifier": " hotels nearby",
            "key": null,
            "rawHtml": " hotels nearby",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_SuggestionTypeahead_Nearby|~|附近约<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>间酒店|~",
        "__key_for_search_target__": "~|<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{ option.source.Metadata.HotelCount }}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> hotels nearby|~|<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> hotels nearby|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 115,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_Destination",
        "meaning": null,
        "source": "目的地",
        "source_identifier": "目的地",
        "source_parts": [
          {
            "displayHtml": "目的地",
            "identifier": "目的地",
            "key": null,
            "rawHtml": "目的地",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Destination",
        "target_identifier": "Destination",
        "target_parts": [
          {
            "displayHtml": "Destination",
            "identifier": "Destination",
            "key": null,
            "rawHtml": "Destination",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_Destination|~|目的地|~",
        "__key_for_search_target__": "~|Destination|~|Destination|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 123,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_Suggestion_No_Result",
        "meaning": null,
        "source": "没有找到任何数据，请输入其他的关键字",
        "source_identifier": "没有找到任何数据，请输入其他的关键字",
        "source_parts": [
          {
            "displayHtml": "没有找到任何数据，请输入其他的关键字",
            "identifier": "没有找到任何数据，请输入其他的关键字",
            "key": null,
            "rawHtml": "没有找到任何数据，请输入其他的关键字",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "No search result. Please update your key words.",
        "target_identifier": "No search result. Please update your key words.",
        "target_parts": [
          {
            "displayHtml": "No search result. Please update your key words.",
            "identifier": "No search result. Please update your key words.",
            "key": null,
            "rawHtml": "No search result. Please update your key words.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_Suggestion_No_Result|~|没有找到任何数据，请输入其他的关键字|~",
        "__key_for_search_target__": "~|No search result. Please update your key words.|~|No search result. Please update your key words.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 130,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_Validate_String_Min_Length",
        "meaning": null,
        "source": "请输入至少 <x id=\"INTERPOLATION\" equiv-text=\"{{ currentSuggestionTypeaheadOptions.minKeywordLength }}\"/> 个字符",
        "source_identifier": "请输入至少 <INTERPOLATION> 个字符",
        "source_parts": [
          {
            "displayHtml": "请输入至少 ",
            "identifier": "请输入至少 ",
            "key": null,
            "rawHtml": "请输入至少 ",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ currentSuggestionTypeaheadOptions.minKeywordLength }}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": " 个字符",
            "identifier": " 个字符",
            "key": null,
            "rawHtml": " 个字符",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Enter at least <x id=\"INTERPOLATION\" equiv-text=\"{{ currentSuggestionTypeaheadOptions.minKeywordLength }}\" /> characters",
        "target_identifier": "Enter at least <INTERPOLATION> characters",
        "target_parts": [
          {
            "displayHtml": "Enter at least ",
            "identifier": "Enter at least ",
            "key": null,
            "rawHtml": "Enter at least ",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ currentSuggestionTypeaheadOptions.minKeywordLength }}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " characters",
            "identifier": " characters",
            "key": null,
            "rawHtml": " characters",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_Validate_String_Min_Length|~|请输入至少 <INTERPOLATION> 个字符|~",
        "__key_for_search_target__": "~|Enter at least <x id=\"INTERPOLATION\" equiv-text=\"{{ currentSuggestionTypeaheadOptions.minKeywordLength }}\" /> characters|~|Enter at least <INTERPOLATION> characters|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 14,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/pagination/pagination.component.html"
          }
        ],
        "description": null,
        "key": "Text_Pagination_TotalDesc",
        "meaning": null,
        "source": "共 <x id=\"INTERPOLATION\" equiv-text=\"{{ total | number }}\"/> 项",
        "source_identifier": "共 <INTERPOLATION> 项",
        "source_parts": [
          {
            "displayHtml": "共 ",
            "identifier": "共 ",
            "key": null,
            "rawHtml": "共 ",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ total | number }}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": " 项",
            "identifier": " 项",
            "key": null,
            "rawHtml": " 项",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Total <x id=\"INTERPOLATION\" equiv-text=\"{{ total | number }}\" /> items",
        "target_identifier": "Total <INTERPOLATION> items",
        "target_parts": [
          {
            "displayHtml": "Total ",
            "identifier": "Total ",
            "key": null,
            "rawHtml": "Total ",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ total | number }}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " items",
            "identifier": " items",
            "key": null,
            "rawHtml": " items",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Pagination_TotalDesc|~|共 <INTERPOLATION> 项|~",
        "__key_for_search_target__": "~|Total <x id=\"INTERPOLATION\" equiv-text=\"{{ total | number }}\" /> items|~|Total <INTERPOLATION> items|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 8,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          },
          {
            "lineNumber": 87,
            "sourceFile": "apps/main-app/src/app/order/order-process/order-process.component.html"
          },
          {
            "lineNumber": 189,
            "sourceFile": "apps/main-app/src/app/order/order-process/order-process.component.html"
          }
        ],
        "description": null,
        "key": "Label_Occupancy_RoomCount",
        "meaning": null,
        "source": "房间数",
        "source_identifier": "房间数",
        "source_parts": [
          {
            "displayHtml": "房间数",
            "identifier": "房间数",
            "key": null,
            "rawHtml": "房间数",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Rooms",
        "target_identifier": "Rooms",
        "target_parts": [
          {
            "displayHtml": "Rooms",
            "identifier": "Rooms",
            "key": null,
            "rawHtml": "Rooms",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Occupancy_RoomCount|~|房间数|~",
        "__key_for_search_target__": "~|Rooms|~|Rooms|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 9,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          },
          {
            "lineNumber": 41,
            "sourceFile": "apps/main-app/src/app/hotels/shared/rate-list-panel/rate-list-panel.component.html"
          }
        ],
        "description": null,
        "key": "Label_Occupancy_Rooms",
        "meaning": null,
        "source": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.roomCount}}\"/>间",
        "source_identifier": "<INTERPOLATION>间",
        "source_parts": [
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.roomCount}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "间",
            "identifier": "间",
            "key": null,
            "rawHtml": "间",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.roomCount}}\" /> Rooms",
        "target_identifier": "<INTERPOLATION> Rooms",
        "target_parts": [
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.roomCount}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " Rooms",
            "identifier": " Rooms",
            "key": null,
            "rawHtml": " Rooms",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Occupancy_Rooms|~|<INTERPOLATION>间|~",
        "__key_for_search_target__": "~|<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.roomCount}}\" /> Rooms|~|<INTERPOLATION> Rooms|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 13,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          },
          {
            "lineNumber": 43,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_Occupancy_RoomCheckIn",
        "meaning": null,
        "source": "每间入住",
        "source_identifier": "每间入住",
        "source_parts": [
          {
            "displayHtml": "每间入住",
            "identifier": "每间入住",
            "key": null,
            "rawHtml": "每间入住",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Per Room",
        "target_identifier": "Per Room",
        "target_parts": [
          {
            "displayHtml": "Per Room",
            "identifier": "Per Room",
            "key": null,
            "rawHtml": "Per Room",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Occupancy_RoomCheckIn|~|每间入住|~",
        "__key_for_search_target__": "~|Per Room|~|Per Room|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 15,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_Occupancy_RoomGuest",
        "meaning": null,
        "source": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.occupancy.AdultCount}}\"/>成人<x id=\"INTERPOLATION_1\" equiv-text=\"{{ndOccupancy.occupancy.ChildCount}}\"/>儿童",
        "source_identifier": "<INTERPOLATION>成人<INTERPOLATION_1>儿童",
        "source_parts": [
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.occupancy.AdultCount}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "成人",
            "identifier": "成人",
            "key": null,
            "rawHtml": "成人",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION_1</i>",
            "identifier": "<INTERPOLATION_1>",
            "key": "INTERPOLATION_1",
            "rawHtml": "<x id=\"INTERPOLATION_1\" equiv-text=\"{{ndOccupancy.occupancy.ChildCount}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "儿童",
            "identifier": "儿童",
            "key": null,
            "rawHtml": "儿童",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.occupancy.AdultCount}}\" /> Adults <x id=\"INTERPOLATION_1\" equiv-text=\"{{ndOccupancy.occupancy.ChildCount}}\" /> Children",
        "target_identifier": "<INTERPOLATION> Adults <INTERPOLATION_1> Children",
        "target_parts": [
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.occupancy.AdultCount}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " Adults ",
            "identifier": " Adults ",
            "key": null,
            "rawHtml": " Adults ",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION_1</i>",
            "identifier": "<INTERPOLATION_1>",
            "key": "INTERPOLATION_1",
            "rawHtml": "<x id=\"INTERPOLATION_1\" equiv-text=\"{{ndOccupancy.occupancy.ChildCount}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " Children",
            "identifier": " Children",
            "key": null,
            "rawHtml": " Children",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Occupancy_RoomGuest|~|<INTERPOLATION>成人<INTERPOLATION_1>儿童|~",
        "__key_for_search_target__": "~|<x id=\"INTERPOLATION\" equiv-text=\"{{ndOccupancy.occupancy.AdultCount}}\" /> Adults <x id=\"INTERPOLATION_1\" equiv-text=\"{{ndOccupancy.occupancy.ChildCount}}\" /> Children|~|<INTERPOLATION> Adults <INTERPOLATION_1> Children|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 61,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          }
        ],
        "description": null,
        "key": "Notice_RoomOccpancyPicker_MultiPerson",
        "meaning": null,
        "source": "多人入住请关注加床政策",
        "source_identifier": "多人入住请关注加床政策",
        "source_parts": [
          {
            "displayHtml": "多人入住请关注加床政策",
            "identifier": "多人入住请关注加床政策",
            "key": null,
            "rawHtml": "多人入住请关注加床政策",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Read extra bed policy for multiple occupancies",
        "target_identifier": "Read extra bed policy for multiple occupancies",
        "target_parts": [
          {
            "displayHtml": "Read extra bed policy for multiple occupancies",
            "identifier": "Read extra bed policy for multiple occupancies",
            "key": null,
            "rawHtml": "Read extra bed policy for multiple occupancies",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Notice_RoomOccpancyPicker_MultiPerson|~|多人入住请关注加床政策|~",
        "__key_for_search_target__": "~|Read extra bed policy for multiple occupancies|~|Read extra bed policy for multiple occupancies|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 78,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/room-occupancy-picker/room-occupancy-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_Occupancy_ChildAge",
        "meaning": null,
        "source": "儿童年龄",
        "source_identifier": "儿童年龄",
        "source_parts": [
          {
            "displayHtml": "儿童年龄",
            "identifier": "儿童年龄",
            "key": null,
            "rawHtml": "儿童年龄",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Child Age",
        "target_identifier": "Child Age",
        "target_parts": [
          {
            "displayHtml": "Child Age",
            "identifier": "Child Age",
            "key": null,
            "rawHtml": "Child Age",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Occupancy_ChildAge|~|儿童年龄|~",
        "__key_for_search_target__": "~|Child Age|~|Child Age|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 5,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-select/nationality-select.component.html"
          },
          {
            "lineNumber": 16,
            "sourceFile": "apps/main-app/src/app/shared/components/nationality-picker/nationality-picker.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_NationalitySearch",
        "meaning": null,
        "source": "请输入国籍/国家名",
        "source_identifier": "请输入国籍/国家名",
        "source_parts": [
          {
            "displayHtml": "请输入国籍/国家名",
            "identifier": "请输入国籍/国家名",
            "key": null,
            "rawHtml": "请输入国籍/国家名",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Please enter nationality/country name",
        "target_identifier": "Please enter nationality/country name",
        "target_parts": [
          {
            "displayHtml": "Please enter nationality/country name",
            "identifier": "Please enter nationality/country name",
            "key": null,
            "rawHtml": "Please enter nationality/country name",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_NationalitySearch|~|请输入国籍/国家名|~",
        "__key_for_search_target__": "~|Please enter nationality/country name|~|Please enter nationality/country name|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 23,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-select/nationality-select.component.html"
          },
          {
            "lineNumber": 20,
            "sourceFile": "apps/main-app/src/app/shared/components/nationality-picker/nationality-picker.component.html"
          }
        ],
        "description": null,
        "key": "Title_Nationality_FrequentlyUse",
        "meaning": null,
        "source": "常用国籍",
        "source_identifier": "常用国籍",
        "source_parts": [
          {
            "displayHtml": "常用国籍",
            "identifier": "常用国籍",
            "key": null,
            "rawHtml": "常用国籍",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Popular Nationalities",
        "target_identifier": "Popular Nationalities",
        "target_parts": [
          {
            "displayHtml": "Popular Nationalities",
            "identifier": "Popular Nationalities",
            "key": null,
            "rawHtml": "Popular Nationalities",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_Nationality_FrequentlyUse|~|常用国籍|~",
        "__key_for_search_target__": "~|Popular Nationalities|~|Popular Nationalities|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 24,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-select/nationality-select.component.html"
          },
          {
            "lineNumber": 28,
            "sourceFile": "apps/main-app/src/app/shared/components/nationality-picker/nationality-picker.component.html"
          }
        ],
        "description": null,
        "key": "Title_Nationality_All",
        "meaning": null,
        "source": "所有国籍",
        "source_identifier": "所有国籍",
        "source_parts": [
          {
            "displayHtml": "所有国籍",
            "identifier": "所有国籍",
            "key": null,
            "rawHtml": "所有国籍",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "All Nationalities",
        "target_identifier": "All Nationalities",
        "target_parts": [
          {
            "displayHtml": "All Nationalities",
            "identifier": "All Nationalities",
            "key": null,
            "rawHtml": "All Nationalities",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_Nationality_All|~|所有国籍|~",
        "__key_for_search_target__": "~|All Nationalities|~|All Nationalities|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 33,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-select/nationality-select.component.html"
          },
          {
            "lineNumber": 29,
            "sourceFile": "apps/main-app/src/app/shared/components/nationality-picker/nationality-picker.component.html"
          }
        ],
        "description": null,
        "key": "Text_NationalityNotFound",
        "meaning": null,
        "source": "抱歉，找不到相关国籍，请确认后再搜索！",
        "source_identifier": "抱歉，找不到相关国籍，请确认后再搜索！",
        "source_parts": [
          {
            "displayHtml": "抱歉，找不到相关国籍，请确认后再搜索！",
            "identifier": "抱歉，找不到相关国籍，请确认后再搜索！",
            "key": null,
            "rawHtml": "抱歉，找不到相关国籍，请确认后再搜索！",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Sorry, nationality is not found. Please try again.",
        "target_identifier": "Sorry, nationality is not found. Please try again.",
        "target_parts": [
          {
            "displayHtml": "Sorry, nationality is not found. Please try again.",
            "identifier": "Sorry, nationality is not found. Please try again.",
            "key": null,
            "rawHtml": "Sorry, nationality is not found. Please try again.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_NationalityNotFound|~|抱歉，找不到相关国籍，请确认后再搜索！|~",
        "__key_for_search_target__": "~|Sorry, nationality is not found. Please try again.|~|Sorry, nationality is not found. Please try again.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 2,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-picker/nationality-picker.component.html"
          },
          {
            "lineNumber": 103,
            "sourceFile": "apps/main-app/src/app/bookings/booking-list/booking-list-card/booking-list-card.component.html"
          },
          {
            "lineNumber": 96,
            "sourceFile": "apps/main-app/src/app/bookings/booking-detail/booking-overview/booking-overview.component.html"
          },
          {
            "lineNumber": 3,
            "sourceFile": "apps/main-app/src/app/order/order/order-occupancy/order-occupancy.component.html"
          },
          {
            "lineNumber": 165,
            "sourceFile": "apps/main-app/src/app/order/order/order.component.html"
          },
          {
            "lineNumber": 32,
            "sourceFile": "apps/booking-app/src/app/bookings/list/card-view-table/card-view-table.component.html"
          }
        ],
        "description": null,
        "key": "Label_Nationality",
        "meaning": null,
        "source": "国籍",
        "source_identifier": "国籍",
        "source_parts": [
          {
            "displayHtml": "国籍",
            "identifier": "国籍",
            "key": null,
            "rawHtml": "国籍",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Nationality",
        "target_identifier": "Nationality",
        "target_parts": [
          {
            "displayHtml": "Nationality",
            "identifier": "Nationality",
            "key": null,
            "rawHtml": "Nationality",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Nationality|~|国籍|~",
        "__key_for_search_target__": "~|Nationality|~|Nationality|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 4,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/nationality-picker/nationality-picker/nationality-picker.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_NationalityPlaceholder",
        "meaning": null,
        "source": "请选择国籍",
        "source_identifier": "请选择国籍",
        "source_parts": [
          {
            "displayHtml": "请选择国籍",
            "identifier": "请选择国籍",
            "key": null,
            "rawHtml": "请选择国籍",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Please select nationality",
        "target_identifier": "Please select nationality",
        "target_parts": [
          {
            "displayHtml": "Please select nationality",
            "identifier": "Please select nationality",
            "key": null,
            "rawHtml": "Please select nationality",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_NationalityPlaceholder|~|请选择国籍|~",
        "__key_for_search_target__": "~|Please select nationality|~|Please select nationality|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 2,
            "sourceFile": "apps/main-app/src/app/shared/components/datetime-picker/components/date-range-picker/date-range-picker.component.html"
          },
          {
            "lineNumber": 2,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/calendar/components/date-range-picker/date-range-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_DatePicker_DateRange",
        "meaning": null,
        "source": "时间",
        "source_identifier": "时间",
        "source_parts": [
          {
            "displayHtml": "时间",
            "identifier": "时间",
            "key": null,
            "rawHtml": "时间",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Dates",
        "target_identifier": "Dates",
        "target_parts": [
          {
            "displayHtml": "Dates",
            "identifier": "Dates",
            "key": null,
            "rawHtml": "Dates",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_DatePicker_DateRange|~|时间|~",
        "__key_for_search_target__": "~|Dates|~|Dates|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 21,
            "sourceFile": "apps/main-app/src/app/shared/components/datetime-picker/components/date-range-picker/date-range-picker.component.html"
          },
          {
            "lineNumber": 35,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/calendar/components/date-range-picker/date-range-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_DatePicker_StayNights",
        "meaning": null,
        "source": "共<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/><x id=\"INTERPOLATION\" equiv-text=\"{{stayNights}}\"/><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>晚",
        "source_identifier": "共<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>晚",
        "source_parts": [
          {
            "displayHtml": "共",
            "identifier": "共",
            "key": null,
            "rawHtml": "共",
            "type": "text"
          },
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{stayNights}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "晚",
            "identifier": "晚",
            "key": null,
            "rawHtml": "晚",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{stayNights}}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> Nights",
        "target_identifier": "<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> Nights",
        "target_parts": [
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{stayNights}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " Nights",
            "identifier": " Nights",
            "key": null,
            "rawHtml": " Nights",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_DatePicker_StayNights|~|共<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>晚|~",
        "__key_for_search_target__": "~|<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{stayNights}}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> Nights|~|<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> Nights|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 35,
            "sourceFile": "apps/main-app/src/app/shared/components/datetime-picker/components/date-range-picker/date-range-picker.component.html"
          },
          {
            "lineNumber": 49,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/calendar/components/date-range-picker/date-range-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_DatePicker_To",
        "meaning": null,
        "source": "至",
        "source_identifier": "至",
        "source_parts": [
          {
            "displayHtml": "至",
            "identifier": "至",
            "key": null,
            "rawHtml": "至",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "to",
        "target_identifier": "to",
        "target_parts": [
          {
            "displayHtml": "to",
            "identifier": "to",
            "key": null,
            "rawHtml": "to",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_DatePicker_To|~|至|~",
        "__key_for_search_target__": "~|to|~|to|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 44,
            "sourceFile": "apps/main-app/src/app/shared/components/datetime-picker/components/date-range-picker/date-range-picker.component.html"
          },
          {
            "lineNumber": 58,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/calendar/components/date-range-picker/date-range-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_DatePicker_StayDays",
        "meaning": null,
        "source": "共<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/><x id=\"INTERPOLATION\" equiv-text=\"{{stayDays}}\"/><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>天",
        "source_identifier": "共<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>天",
        "source_parts": [
          {
            "displayHtml": "共",
            "identifier": "共",
            "key": null,
            "rawHtml": "共",
            "type": "text"
          },
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{stayDays}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "天",
            "identifier": "天",
            "key": null,
            "rawHtml": "天",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{stayDays}}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> Days",
        "target_identifier": "<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> Days",
        "target_parts": [
          {
            "displayHtml": "<i>START_TAG_SPAN</i>",
            "identifier": "<START_TAG_SPAN>",
            "key": "START_TAG_SPAN",
            "rawHtml": "<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{stayDays}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": "<i>CLOSE_TAG_SPAN</i>",
            "identifier": "<CLOSE_TAG_SPAN>",
            "key": "CLOSE_TAG_SPAN",
            "rawHtml": "<x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " Days",
            "identifier": " Days",
            "key": null,
            "rawHtml": " Days",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_DatePicker_StayDays|~|共<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>天|~",
        "__key_for_search_target__": "~|<x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{stayDays}}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" /> Days|~|<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN> Days|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 2,
            "sourceFile": "apps/main-app/src/app/shared/components/gaode-maps/radar-toolkit/gaode-maps-radar-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Button_RangeSelectHotel",
        "meaning": null,
        "source": "圈选酒店",
        "source_identifier": "圈选酒店",
        "source_parts": [
          {
            "displayHtml": "圈选酒店",
            "identifier": "圈选酒店",
            "key": null,
            "rawHtml": "圈选酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Range Select",
        "target_identifier": "Range Select",
        "target_parts": [
          {
            "displayHtml": "Range Select",
            "identifier": "Range Select",
            "key": null,
            "rawHtml": "Range Select",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Button_RangeSelectHotel|~|圈选酒店|~",
        "__key_for_search_target__": "~|Range Select|~|Range Select|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 3,
            "sourceFile": "apps/main-app/src/app/shared/components/gaode-maps/radar-toolkit/gaode-maps-radar-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Button_CancelRangeSelect",
        "meaning": null,
        "source": "取消圈选",
        "source_identifier": "取消圈选",
        "source_parts": [
          {
            "displayHtml": "取消圈选",
            "identifier": "取消圈选",
            "key": null,
            "rawHtml": "取消圈选",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Cancel Range Select",
        "target_identifier": "Cancel Range Select",
        "target_parts": [
          {
            "displayHtml": "Cancel Range Select",
            "identifier": "Cancel Range Select",
            "key": null,
            "rawHtml": "Cancel Range Select",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Button_CancelRangeSelect|~|取消圈选|~",
        "__key_for_search_target__": "~|Cancel Range Select|~|Cancel Range Select|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 12,
            "sourceFile": "apps/main-app/src/app/shared/components/gaode-maps/radar-toolkit/gaode-maps-radar-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Text_Info_RadarRadiusHanleTooltips",
        "meaning": null,
        "source": "拖动可调整周边圆半径及范围",
        "source_identifier": "拖动可调整周边圆半径及范围",
        "source_parts": [
          {
            "displayHtml": "拖动可调整周边圆半径及范围",
            "identifier": "拖动可调整周边圆半径及范围",
            "key": null,
            "rawHtml": "拖动可调整周边圆半径及范围",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Drag to change range",
        "target_identifier": "Drag to change range",
        "target_parts": [
          {
            "displayHtml": "Drag to change range",
            "identifier": "Drag to change range",
            "key": null,
            "rawHtml": "Drag to change range",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_RadarRadiusHanleTooltips|~|拖动可调整周边圆半径及范围|~",
        "__key_for_search_target__": "~|Drag to change range|~|Drag to change range|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 8,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 9,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/main-app/src/app/messages/message-box/message-box.component.html"
          }
        ],
        "description": null,
        "key": "Label_MessageCenter",
        "meaning": null,
        "source": "消息中心",
        "source_identifier": "消息中心",
        "source_parts": [
          {
            "displayHtml": "消息中心",
            "identifier": "消息中心",
            "key": null,
            "rawHtml": "消息中心",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Notification Center",
        "target_identifier": "Notification Center",
        "target_parts": [
          {
            "displayHtml": "Notification Center",
            "identifier": "Notification Center",
            "key": null,
            "rawHtml": "Notification Center",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_MessageCenter|~|消息中心|~",
        "__key_for_search_target__": "~|Notification Center|~|Notification Center|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 17,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 19,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 33,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 2,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-favorite-hotel/side-toolkit-favorite-hotel.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_FavoriteHotel",
        "meaning": null,
        "source": "酒店收藏",
        "source_identifier": "酒店收藏",
        "source_parts": [
          {
            "displayHtml": "酒店收藏",
            "identifier": "酒店收藏",
            "key": null,
            "rawHtml": "酒店收藏",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Favorites",
        "target_identifier": "Favorites",
        "target_parts": [
          {
            "displayHtml": "Favorites",
            "identifier": "Favorites",
            "key": null,
            "rawHtml": "Favorites",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_FavoriteHotel|~|酒店收藏|~",
        "__key_for_search_target__": "~|Favorites|~|Favorites|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 44,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Title_FillingSurveyGainPointsRewards",
        "meaning": null,
        "source": "填问卷，免费得积分！！！",
        "source_identifier": "填问卷，免费得积分！！！",
        "source_parts": [
          {
            "displayHtml": "填问卷，免费得积分！！！",
            "identifier": "填问卷，免费得积分！！！",
            "key": null,
            "rawHtml": "填问卷，免费得积分！！！",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Complete the survey to get free points.",
        "target_identifier": "Complete the survey to get free points.",
        "target_parts": [
          {
            "displayHtml": "Complete the survey to get free points.",
            "identifier": "Complete the survey to get free points.",
            "key": null,
            "rawHtml": "Complete the survey to get free points.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_FillingSurveyGainPointsRewards|~|填问卷，免费得积分！！！|~",
        "__key_for_search_target__": "~|Complete the survey to get free points.|~|Complete the survey to get free points.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 45,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_FillingSurveyGainPointsRewards_Description",
        "meaning": null,
        "source": "为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~",
        "source_identifier": "为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~",
        "source_parts": [
          {
            "displayHtml": "为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~",
            "identifier": "为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~",
            "key": null,
            "rawHtml": "为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.",
        "target_identifier": "In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.",
        "target_parts": [
          {
            "displayHtml": "In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.",
            "identifier": "In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.",
            "key": null,
            "rawHtml": "In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FillingSurveyGainPointsRewards_Description|~|为了更好地为您提供服务，我们特意设计了这一问卷，希望您能拨冗参与，稍后我们会送上相应积分以表感谢~|~",
        "__key_for_search_target__": "~|In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.|~|In order to provide better service, we designed this survey. Please take your valuable time to complete the survey. We will be given free points.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 36,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_Survey",
        "meaning": null,
        "source": "问卷调查",
        "source_identifier": "问卷调查",
        "source_parts": [
          {
            "displayHtml": "问卷调查",
            "identifier": "问卷调查",
            "key": null,
            "rawHtml": "问卷调查",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Survey",
        "target_identifier": "Survey",
        "target_parts": [
          {
            "displayHtml": "Survey",
            "identifier": "Survey",
            "key": null,
            "rawHtml": "Survey",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_Survey|~|问卷调查|~",
        "__key_for_search_target__": "~|Survey|~|Survey|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 48,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 53,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_CustomerCenter",
        "meaning": null,
        "source": "客服中心",
        "source_identifier": "客服中心",
        "source_parts": [
          {
            "displayHtml": "客服中心",
            "identifier": "客服中心",
            "key": null,
            "rawHtml": "客服中心",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Customer service center",
        "target_identifier": "Customer service center",
        "target_parts": [
          {
            "displayHtml": "Customer service center",
            "identifier": "Customer service center",
            "key": null,
            "rawHtml": "Customer service center",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_CustomerCenter|~|客服中心|~",
        "__key_for_search_target__": "~|Customer service center|~|Customer service center|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 55,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 57,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 2,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_Feedback",
        "meaning": null,
        "source": "建议反馈",
        "source_identifier": "建议反馈",
        "source_parts": [
          {
            "displayHtml": "建议反馈",
            "identifier": "建议反馈",
            "key": null,
            "rawHtml": "建议反馈",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Feedback",
        "target_identifier": "Feedback",
        "target_parts": [
          {
            "displayHtml": "Feedback",
            "identifier": "Feedback",
            "key": null,
            "rawHtml": "Feedback",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_Feedback|~|建议反馈|~",
        "__key_for_search_target__": "~|Feedback|~|Feedback|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 62,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_FAQ",
        "meaning": null,
        "source": "常见问题",
        "source_identifier": "常见问题",
        "source_parts": [
          {
            "displayHtml": "常见问题",
            "identifier": "常见问题",
            "key": null,
            "rawHtml": "常见问题",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "FAQ",
        "target_identifier": "FAQ",
        "target_parts": [
          {
            "displayHtml": "FAQ",
            "identifier": "FAQ",
            "key": null,
            "rawHtml": "FAQ",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_FAQ|~|常见问题|~",
        "__key_for_search_target__": "~|FAQ|~|FAQ|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 67,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 290,
            "sourceFile": "apps/main-app/src/app/promotion/activity/activity.component.html"
          },
          {
            "lineNumber": 71,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Text_SideNav_BackToTop",
        "meaning": null,
        "source": "回到顶部",
        "source_identifier": "回到顶部",
        "source_parts": [
          {
            "displayHtml": "回到顶部",
            "identifier": "回到顶部",
            "key": null,
            "rawHtml": "回到顶部",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Back to Top",
        "target_identifier": "Back to Top",
        "target_parts": [
          {
            "displayHtml": "Back to Top",
            "identifier": "Back to Top",
            "key": null,
            "rawHtml": "Back to Top",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_SideNav_BackToTop|~|回到顶部|~",
        "__key_for_search_target__": "~|Back to Top|~|Back to Top|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 96,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 21,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-message-box/side-toolkit-message-box.component.html"
          },
          {
            "lineNumber": 19,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-favorite-hotel/side-toolkit-favorite-hotel.component.html"
          }
        ],
        "description": null,
        "key": "Text_Notice_NoNewMessage",
        "meaning": null,
        "source": "暂无新消息",
        "source_identifier": "暂无新消息",
        "source_parts": [
          {
            "displayHtml": "暂无新消息",
            "identifier": "暂无新消息",
            "key": null,
            "rawHtml": "暂无新消息",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "No new message",
        "target_identifier": "No new message",
        "target_parts": [
          {
            "displayHtml": "No new message",
            "identifier": "No new message",
            "key": null,
            "rawHtml": "No new message",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Notice_NoNewMessage|~|暂无新消息|~",
        "__key_for_search_target__": "~|No new message|~|No new message|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 102,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 123,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-detail/hotel-overview/hotel-overview.component.html"
          },
          {
            "lineNumber": 132,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-find/hotel-find.component.html"
          },
          {
            "lineNumber": 151,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-find/hotel-find.component.html"
          },
          {
            "lineNumber": 173,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-find/hotel-find.component.html"
          },
          {
            "lineNumber": 196,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-index/hotel-index.component.html"
          },
          {
            "lineNumber": 215,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-index/hotel-index.component.html"
          },
          {
            "lineNumber": 237,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-index/hotel-index.component.html"
          },
          {
            "lineNumber": 11,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 25,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 137,
            "sourceFile": "apps/main-app/src/app/order/order/order.component.html"
          },
          {
            "lineNumber": 44,
            "sourceFile": "apps/booking-app/src/app/tickets/ticket-log/ticket-log.component.html"
          }
        ],
        "description": null,
        "key": "Text_ViewMore",
        "meaning": null,
        "source": "查看更多",
        "source_identifier": "查看更多",
        "source_parts": [
          {
            "displayHtml": "查看更多",
            "identifier": "查看更多",
            "key": null,
            "rawHtml": "查看更多",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "View more",
        "target_identifier": "View more",
        "target_parts": [
          {
            "displayHtml": "View more",
            "identifier": "View more",
            "key": null,
            "rawHtml": "View more",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_ViewMore|~|查看更多|~",
        "__key_for_search_target__": "~|View more|~|View more|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 106,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_MarkAllAsReaded",
        "meaning": null,
        "source": "全部标记已读(<x id=\"INTERPOLATION\" equiv-text=\"{{unreadMessageInfo.Data.length}}\"/>条)",
        "source_identifier": "全部标记已读(<INTERPOLATION>条)",
        "source_parts": [
          {
            "displayHtml": "全部标记已读(",
            "identifier": "全部标记已读(",
            "key": null,
            "rawHtml": "全部标记已读(",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{unreadMessageInfo.Data.length}}\"/>",
            "type": "ph_tag"
          },
          {
            "displayHtml": "条)",
            "identifier": "条)",
            "key": null,
            "rawHtml": "条)",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Read all (<x id=\"INTERPOLATION\" equiv-text=\"{{unreadMessageInfo.Data.length}}\" /> messages)",
        "target_identifier": "Read all (<INTERPOLATION> messages)",
        "target_parts": [
          {
            "displayHtml": "Read all (",
            "identifier": "Read all (",
            "key": null,
            "rawHtml": "Read all (",
            "type": "text"
          },
          {
            "displayHtml": "<i>INTERPOLATION</i>",
            "identifier": "<INTERPOLATION>",
            "key": "INTERPOLATION",
            "rawHtml": "<x id=\"INTERPOLATION\" equiv-text=\"{{unreadMessageInfo.Data.length}}\" />",
            "type": "ph_tag"
          },
          {
            "displayHtml": " messages)",
            "identifier": " messages)",
            "key": null,
            "rawHtml": " messages)",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_MarkAllAsReaded|~|全部标记已读(<INTERPOLATION>条)|~",
        "__key_for_search_target__": "~|Read all (<x id=\"INTERPOLATION\" equiv-text=\"{{unreadMessageInfo.Data.length}}\" /> messages)|~|Read all (<INTERPOLATION> messages)|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 114,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Notice_NoFavoriteHotel",
        "meaning": null,
        "source": "您还没收藏任何酒店哦!",
        "source_identifier": "您还没收藏任何酒店哦!",
        "source_parts": [
          {
            "displayHtml": "您还没收藏任何酒店哦!",
            "identifier": "您还没收藏任何酒店哦!",
            "key": null,
            "rawHtml": "您还没收藏任何酒店哦!",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Favorites is empty!",
        "target_identifier": "Favorites is empty!",
        "target_parts": [
          {
            "displayHtml": "Favorites is empty!",
            "identifier": "Favorites is empty!",
            "key": null,
            "rawHtml": "Favorites is empty!",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Notice_NoFavoriteHotel|~|您还没收藏任何酒店哦!|~",
        "__key_for_search_target__": "~|Favorites is empty!|~|Favorites is empty!|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 142,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 79,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Title_SideNav_CustomerCenter",
        "meaning": null,
        "source": "客服中心（7*24小时）",
        "source_identifier": "客服中心（7*24小时）",
        "source_parts": [
          {
            "displayHtml": "客服中心（7*24小时）",
            "identifier": "客服中心（7*24小时）",
            "key": null,
            "rawHtml": "客服中心（7*24小时）",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Customer Service Center (7*24 hours)",
        "target_identifier": "Customer Service Center (7*24 hours)",
        "target_parts": [
          {
            "displayHtml": "Customer Service Center (7*24 hours)",
            "identifier": "Customer Service Center (7*24 hours)",
            "key": null,
            "rawHtml": "Customer Service Center (7*24 hours)",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_SideNav_CustomerCenter|~|客服中心（7*24小时）|~",
        "__key_for_search_target__": "~|Customer Service Center (7*24 hours)|~|Customer Service Center (7*24 hours)|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 154,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 85,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Notice_CustomerTelephonePrioritize",
        "meaning": null,
        "source": "00:00-8:00优先处理紧急到店问题",
        "source_identifier": "00:00-8:00优先处理紧急到店问题",
        "source_parts": [
          {
            "displayHtml": "00:00-8:00优先处理紧急到店问题",
            "identifier": "00:00-8:00优先处理紧急到店问题",
            "key": null,
            "rawHtml": "00:00-8:00优先处理紧急到店问题",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "From 0:00 to 8:00, check-in issues will be handled first",
        "target_identifier": "From 0:00 to 8:00, check-in issues will be handled first",
        "target_parts": [
          {
            "displayHtml": "From 0:00 to 8:00, check-in issues will be handled first",
            "identifier": "From 0:00 to 8:00, check-in issues will be handled first",
            "key": null,
            "rawHtml": "From 0:00 to 8:00, check-in issues will be handled first",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Notice_CustomerTelephonePrioritize|~|00:00-8:00优先处理紧急到店问题|~",
        "__key_for_search_target__": "~|From 0:00 to 8:00, check-in issues will be handled first|~|From 0:00 to 8:00, check-in issues will be handled first|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 156,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 86,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Notice_PreSaleServiceTime",
        "meaning": null,
        "source": "售前服务时段",
        "source_identifier": "售前服务时段",
        "source_parts": [
          {
            "displayHtml": "售前服务时段",
            "identifier": "售前服务时段",
            "key": null,
            "rawHtml": "售前服务时段",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Pre-sale Service Time",
        "target_identifier": "Pre-sale Service Time",
        "target_parts": [
          {
            "displayHtml": "Pre-sale Service Time",
            "identifier": "Pre-sale Service Time",
            "key": null,
            "rawHtml": "Pre-sale Service Time",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Notice_PreSaleServiceTime|~|售前服务时段|~",
        "__key_for_search_target__": "~|Pre-sale Service Time|~|Pre-sale Service Time|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 158,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 163,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 88,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 92,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_BeijingTime",
        "meaning": null,
        "source": "北京时间",
        "source_identifier": "北京时间",
        "source_parts": [
          {
            "displayHtml": "北京时间",
            "identifier": "北京时间",
            "key": null,
            "rawHtml": "北京时间",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Beijing Time",
        "target_identifier": "Beijing Time",
        "target_parts": [
          {
            "displayHtml": "Beijing Time",
            "identifier": "Beijing Time",
            "key": null,
            "rawHtml": "Beijing Time",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_BeijingTime|~|北京时间|~",
        "__key_for_search_target__": "~|Beijing Time|~|Beijing Time|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 161,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 90,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Notice_ComplaintServiceTime",
        "meaning": null,
        "source": "投诉处理时段",
        "source_identifier": "投诉处理时段",
        "source_parts": [
          {
            "displayHtml": "投诉处理时段",
            "identifier": "投诉处理时段",
            "key": null,
            "rawHtml": "投诉处理时段",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Complaints Service Time",
        "target_identifier": "Complaints Service Time",
        "target_parts": [
          {
            "displayHtml": "Complaints Service Time",
            "identifier": "Complaints Service Time",
            "key": null,
            "rawHtml": "Complaints Service Time",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Notice_ComplaintServiceTime|~|投诉处理时段|~",
        "__key_for_search_target__": "~|Complaints Service Time|~|Complaints Service Time|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 167,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 96,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_HotelRelBizService",
        "meaning": null,
        "source": "酒店业务",
        "source_identifier": "酒店业务",
        "source_parts": [
          {
            "displayHtml": "酒店业务",
            "identifier": "酒店业务",
            "key": null,
            "rawHtml": "酒店业务",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel Service",
        "target_identifier": "Hotel Service",
        "target_parts": [
          {
            "displayHtml": "Hotel Service",
            "identifier": "Hotel Service",
            "key": null,
            "rawHtml": "Hotel Service",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_HotelRelBizService|~|酒店业务|~",
        "__key_for_search_target__": "~|Hotel Service|~|Hotel Service|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 170,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 194,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 99,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 117,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_MainlandChinaCalls",
        "meaning": null,
        "source": "中国大陆拨打",
        "source_identifier": "中国大陆拨打",
        "source_parts": [
          {
            "displayHtml": "中国大陆拨打",
            "identifier": "中国大陆拨打",
            "key": null,
            "rawHtml": "中国大陆拨打",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "For Domestic Call",
        "target_identifier": "For Domestic Call",
        "target_parts": [
          {
            "displayHtml": "For Domestic Call",
            "identifier": "For Domestic Call",
            "key": null,
            "rawHtml": "For Domestic Call",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_MainlandChinaCalls|~|中国大陆拨打|~",
        "__key_for_search_target__": "~|For Domestic Call|~|For Domestic Call|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 174,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 198,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 103,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 121,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_NonMainlandChinaCalls",
        "meaning": null,
        "source": "非中国大陆拨打",
        "source_identifier": "非中国大陆拨打",
        "source_parts": [
          {
            "displayHtml": "非中国大陆拨打",
            "identifier": "非中国大陆拨打",
            "key": null,
            "rawHtml": "非中国大陆拨打",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "For International Call",
        "target_identifier": "For International Call",
        "target_parts": [
          {
            "displayHtml": "For International Call",
            "identifier": "For International Call",
            "key": null,
            "rawHtml": "For International Call",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_NonMainlandChinaCalls|~|非中国大陆拨打|~",
        "__key_for_search_target__": "~|For International Call|~|For International Call|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 180,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 107,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_PostSale",
        "meaning": null,
        "source": "国内售后邮箱",
        "source_identifier": "国内售后邮箱",
        "source_parts": [
          {
            "displayHtml": "国内售后邮箱",
            "identifier": "国内售后邮箱",
            "key": null,
            "rawHtml": "国内售后邮箱",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Domestic Post-sale Email",
        "target_identifier": "Domestic Post-sale Email",
        "target_parts": [
          {
            "displayHtml": "Domestic Post-sale Email",
            "identifier": "Domestic Post-sale Email",
            "key": null,
            "rawHtml": "Domestic Post-sale Email",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_PostSale|~|国内售后邮箱|~",
        "__key_for_search_target__": "~|Domestic Post-sale Email|~|Domestic Post-sale Email|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 186,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 33,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/footer/footer.component.html"
          },
          {
            "lineNumber": 27,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/footer/footer.component.html"
          },
          {
            "lineNumber": 111,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Text_Label_DomesticComplaintEmail",
        "meaning": null,
        "source": "国内投诉邮箱",
        "source_identifier": "国内投诉邮箱",
        "source_parts": [
          {
            "displayHtml": "国内投诉邮箱",
            "identifier": "国内投诉邮箱",
            "key": null,
            "rawHtml": "国内投诉邮箱",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Domestic Complaints Email:",
        "target_identifier": "Domestic Complaints Email:",
        "target_parts": [
          {
            "displayHtml": "Domestic Complaints Email:",
            "identifier": "Domestic Complaints Email:",
            "key": null,
            "rawHtml": "Domestic Complaints Email:",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Label_DomesticComplaintEmail|~|国内投诉邮箱|~",
        "__key_for_search_target__": "~|Domestic Complaints Email:|~|Domestic Complaints Email:|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 202,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 125,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Label_Overseas",
        "meaning": null,
        "source": "海外客户",
        "source_identifier": "海外客户",
        "source_parts": [
          {
            "displayHtml": "海外客户",
            "identifier": "海外客户",
            "key": null,
            "rawHtml": "海外客户",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Overseas Client",
        "target_identifier": "Overseas Client",
        "target_parts": [
          {
            "displayHtml": "Overseas Client",
            "identifier": "Overseas Client",
            "key": null,
            "rawHtml": "Overseas Client",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Overseas|~|海外客户|~",
        "__key_for_search_target__": "~|Overseas Client|~|Overseas Client|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 208,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 131,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          }
        ],
        "description": null,
        "key": "Text_Label_TransferService",
        "meaning": null,
        "source": "接送机业务",
        "source_identifier": "接送机业务",
        "source_parts": [
          {
            "displayHtml": "接送机业务",
            "identifier": "接送机业务",
            "key": null,
            "rawHtml": "接送机业务",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Transfer",
        "target_identifier": "Transfer",
        "target_parts": [
          {
            "displayHtml": "Transfer",
            "identifier": "Transfer",
            "key": null,
            "rawHtml": "Transfer",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Label_TransferService|~|接送机业务|~",
        "__key_for_search_target__": "~|Transfer|~|Transfer|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 212,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 232,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 124,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 127,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 382,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 294,
            "sourceFile": "apps/main-app/src/app/order/order/order.component.html"
          }
        ],
        "description": null,
        "key": "Label_Phone",
        "meaning": null,
        "source": "电话",
        "source_identifier": "电话",
        "source_parts": [
          {
            "displayHtml": "电话",
            "identifier": "电话",
            "key": null,
            "rawHtml": "电话",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Phone",
        "target_identifier": "Phone",
        "target_parts": [
          {
            "displayHtml": "Phone",
            "identifier": "Phone",
            "key": null,
            "rawHtml": "Phone",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Phone|~|电话|~",
        "__key_for_search_target__": "~|Phone|~|Phone|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 218,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 239,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 345,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 5,
            "sourceFile": "apps/main-app/src/app/shared/form/dida-form-group/dida-email/dida-email.component.html"
          },
          {
            "lineNumber": 9,
            "sourceFile": "apps/main-app/src/app/shared/form/dida-form-group/dida-email/dida-email.component.html"
          },
          {
            "lineNumber": 220,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 460,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 490,
            "sourceFile": "apps/main-app/src/app/account/manage/manage.component.html"
          },
          {
            "lineNumber": 41,
            "sourceFile": "apps/main-app/src/app/account/subaccount/subaccount.component.html"
          },
          {
            "lineNumber": 100,
            "sourceFile": "apps/main-app/src/app/bookings/booking-detail/booking-overview/booking-overview.component.html"
          },
          {
            "lineNumber": 24,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 134,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 148,
            "sourceFile": "apps/main-app/src/app/points/shared/address/address.component.html"
          },
          {
            "lineNumber": 37,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-detail/invoice-detail-info/invoice-detail-info.component.html"
          },
          {
            "lineNumber": 137,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/site-toolkit.component.html"
          },
          {
            "lineNumber": 88,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_Email",
        "meaning": null,
        "source": "邮箱",
        "source_identifier": "邮箱",
        "source_parts": [
          {
            "displayHtml": "邮箱",
            "identifier": "邮箱",
            "key": null,
            "rawHtml": "邮箱",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Email",
        "target_identifier": "Email",
        "target_parts": [
          {
            "displayHtml": "Email",
            "identifier": "Email",
            "key": null,
            "rawHtml": "Email",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Email|~|邮箱|~",
        "__key_for_search_target__": "~|Email|~|Email|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 226,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Label_SaleManager",
        "meaning": null,
        "source": "专属销售经理",
        "source_identifier": "专属销售经理",
        "source_parts": [
          {
            "displayHtml": "专属销售经理",
            "identifier": "专属销售经理",
            "key": null,
            "rawHtml": "专属销售经理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Sales Manager",
        "target_identifier": "Sales Manager",
        "target_parts": [
          {
            "displayHtml": "Sales Manager",
            "identifier": "Sales Manager",
            "key": null,
            "rawHtml": "Sales Manager",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_SaleManager|~|专属销售经理|~",
        "__key_for_search_target__": "~|Sales Manager|~|Sales Manager|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 254,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Title_FeedbackModal",
        "meaning": null,
        "source": "建议反馈",
        "source_identifier": "建议反馈",
        "source_parts": [
          {
            "displayHtml": "建议反馈",
            "identifier": "建议反馈",
            "key": null,
            "rawHtml": "建议反馈",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Feedback",
        "target_identifier": "Feedback",
        "target_parts": [
          {
            "displayHtml": "Feedback",
            "identifier": "Feedback",
            "key": null,
            "rawHtml": "Feedback",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Title_FeedbackModal|~|建议反馈|~",
        "__key_for_search_target__": "~|Feedback|~|Feedback|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 263,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_FeedbackType",
        "meaning": null,
        "source": "反馈类型",
        "source_identifier": "反馈类型",
        "source_parts": [
          {
            "displayHtml": "反馈类型",
            "identifier": "反馈类型",
            "key": null,
            "rawHtml": "反馈类型",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Feedback Type",
        "target_identifier": "Feedback Type",
        "target_parts": [
          {
            "displayHtml": "Feedback Type",
            "identifier": "Feedback Type",
            "key": null,
            "rawHtml": "Feedback Type",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_FeedbackType|~|反馈类型|~",
        "__key_for_search_target__": "~|Feedback Type|~|Feedback Type|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 268,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 11,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeebackType_Encourage",
        "meaning": null,
        "source": "给道旅好评点赞",
        "source_identifier": "给道旅好评点赞",
        "source_parts": [
          {
            "displayHtml": "给道旅好评点赞",
            "identifier": "给道旅好评点赞",
            "key": null,
            "rawHtml": "给道旅好评点赞",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Like us",
        "target_identifier": "Like us",
        "target_parts": [
          {
            "displayHtml": "Like us",
            "identifier": "Like us",
            "key": null,
            "rawHtml": "Like us",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeebackType_Encourage|~|给道旅好评点赞|~",
        "__key_for_search_target__": "~|Like us|~|Like us|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 272,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeebackType_Complain",
        "meaning": null,
        "source": "我要吐槽给差评",
        "source_identifier": "我要吐槽给差评",
        "source_parts": [
          {
            "displayHtml": "我要吐槽给差评",
            "identifier": "我要吐槽给差评",
            "key": null,
            "rawHtml": "我要吐槽给差评",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Dislike us",
        "target_identifier": "Dislike us",
        "target_parts": [
          {
            "displayHtml": "Dislike us",
            "identifier": "Dislike us",
            "key": null,
            "rawHtml": "Dislike us",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeebackType_Complain|~|我要吐槽给差评|~",
        "__key_for_search_target__": "~|Dislike us|~|Dislike us|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 275,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 18,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeebackType_NewFearture",
        "meaning": null,
        "source": "我要提功能需求",
        "source_identifier": "我要提功能需求",
        "source_parts": [
          {
            "displayHtml": "我要提功能需求",
            "identifier": "我要提功能需求",
            "key": null,
            "rawHtml": "我要提功能需求",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Need new website feature",
        "target_identifier": "Need new website feature",
        "target_parts": [
          {
            "displayHtml": "Need new website feature",
            "identifier": "Need new website feature",
            "key": null,
            "rawHtml": "Need new website feature",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeebackType_NewFearture|~|我要提功能需求|~",
        "__key_for_search_target__": "~|Need new website feature|~|Need new website feature|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 278,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 21,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeebackType_Resource",
        "meaning": null,
        "source": "酒店的信息出错/缺失了",
        "source_identifier": "酒店的信息出错/缺失了",
        "source_parts": [
          {
            "displayHtml": "酒店的信息出错/缺失了",
            "identifier": "酒店的信息出错/缺失了",
            "key": null,
            "rawHtml": "酒店的信息出错/缺失了",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel content mistake/missing",
        "target_identifier": "Hotel content mistake/missing",
        "target_parts": [
          {
            "displayHtml": "Hotel content mistake/missing",
            "identifier": "Hotel content mistake/missing",
            "key": null,
            "rawHtml": "Hotel content mistake/missing",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeebackType_Resource|~|酒店的信息出错/缺失了|~",
        "__key_for_search_target__": "~|Hotel content mistake/missing|~|Hotel content mistake/missing|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 281,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 24,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeebackType_Others",
        "meaning": null,
        "source": "其他",
        "source_identifier": "其他",
        "source_parts": [
          {
            "displayHtml": "其他",
            "identifier": "其他",
            "key": null,
            "rawHtml": "其他",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Other",
        "target_identifier": "Other",
        "target_parts": [
          {
            "displayHtml": "Other",
            "identifier": "Other",
            "key": null,
            "rawHtml": "Other",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeebackType_Others|~|其他|~",
        "__key_for_search_target__": "~|Other|~|Other|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 288,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 32,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_FeedbackSubtype",
        "meaning": null,
        "source": "哪里错了",
        "source_identifier": "哪里错了",
        "source_parts": [
          {
            "displayHtml": "哪里错了",
            "identifier": "哪里错了",
            "key": null,
            "rawHtml": "哪里错了",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "What is wrong",
        "target_identifier": "What is wrong",
        "target_parts": [
          {
            "displayHtml": "What is wrong",
            "identifier": "What is wrong",
            "key": null,
            "rawHtml": "What is wrong",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_FeedbackSubtype|~|哪里错了|~",
        "__key_for_search_target__": "~|What is wrong|~|What is wrong|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 293,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 38,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_HotelNameError",
        "meaning": null,
        "source": "酒店中/英文名称错误",
        "source_identifier": "酒店中/英文名称错误",
        "source_parts": [
          {
            "displayHtml": "酒店中/英文名称错误",
            "identifier": "酒店中/英文名称错误",
            "key": null,
            "rawHtml": "酒店中/英文名称错误",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel Chinese/English name mistake",
        "target_identifier": "Hotel Chinese/English name mistake",
        "target_parts": [
          {
            "displayHtml": "Hotel Chinese/English name mistake",
            "identifier": "Hotel Chinese/English name mistake",
            "key": null,
            "rawHtml": "Hotel Chinese/English name mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_HotelNameError|~|酒店中/英文名称错误|~",
        "__key_for_search_target__": "~|Hotel Chinese/English name mistake|~|Hotel Chinese/English name mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 296,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 40,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_RateStarError",
        "meaning": null,
        "source": "星级错误",
        "source_identifier": "星级错误",
        "source_parts": [
          {
            "displayHtml": "星级错误",
            "identifier": "星级错误",
            "key": null,
            "rawHtml": "星级错误",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Star mistake",
        "target_identifier": "Star mistake",
        "target_parts": [
          {
            "displayHtml": "Star mistake",
            "identifier": "Star mistake",
            "key": null,
            "rawHtml": "Star mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_RateStarError|~|星级错误|~",
        "__key_for_search_target__": "~|Star mistake|~|Star mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 299,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 42,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_AddressError",
        "meaning": null,
        "source": "地址信息错误",
        "source_identifier": "地址信息错误",
        "source_parts": [
          {
            "displayHtml": "地址信息错误",
            "identifier": "地址信息错误",
            "key": null,
            "rawHtml": "地址信息错误",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Address mistake",
        "target_identifier": "Address mistake",
        "target_parts": [
          {
            "displayHtml": "Address mistake",
            "identifier": "Address mistake",
            "key": null,
            "rawHtml": "Address mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_AddressError|~|地址信息错误|~",
        "__key_for_search_target__": "~|Address mistake|~|Address mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 302,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 44,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_TelephoneError",
        "meaning": null,
        "source": "酒店电话错误",
        "source_identifier": "酒店电话错误",
        "source_parts": [
          {
            "displayHtml": "酒店电话错误",
            "identifier": "酒店电话错误",
            "key": null,
            "rawHtml": "酒店电话错误",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel phone number mistake",
        "target_identifier": "Hotel phone number mistake",
        "target_parts": [
          {
            "displayHtml": "Hotel phone number mistake",
            "identifier": "Hotel phone number mistake",
            "key": null,
            "rawHtml": "Hotel phone number mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_TelephoneError|~|酒店电话错误|~",
        "__key_for_search_target__": "~|Hotel phone number mistake|~|Hotel phone number mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 305,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 46,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_WebsiteError",
        "meaning": null,
        "source": "酒店官网错误",
        "source_identifier": "酒店官网错误",
        "source_parts": [
          {
            "displayHtml": "酒店官网错误",
            "identifier": "酒店官网错误",
            "key": null,
            "rawHtml": "酒店官网错误",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Hotel official website mistake",
        "target_identifier": "Hotel official website mistake",
        "target_parts": [
          {
            "displayHtml": "Hotel official website mistake",
            "identifier": "Hotel official website mistake",
            "key": null,
            "rawHtml": "Hotel official website mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_WebsiteError|~|酒店官网错误|~",
        "__key_for_search_target__": "~|Hotel official website mistake|~|Hotel official website mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 308,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 48,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_FeedbackSubtype_Others",
        "meaning": null,
        "source": "其他",
        "source_identifier": "其他",
        "source_parts": [
          {
            "displayHtml": "其他",
            "identifier": "其他",
            "key": null,
            "rawHtml": "其他",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Other",
        "target_identifier": "Other",
        "target_parts": [
          {
            "displayHtml": "Other",
            "identifier": "Other",
            "key": null,
            "rawHtml": "Other",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_FeedbackSubtype_Others|~|其他|~",
        "__key_for_search_target__": "~|Other|~|Other|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 291,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 36,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_FeedbackType",
        "meaning": null,
        "source": "告诉道旅，酒店哪个信息出错了",
        "source_identifier": "告诉道旅，酒店哪个信息出错了",
        "source_parts": [
          {
            "displayHtml": "告诉道旅，酒店哪个信息出错了",
            "identifier": "告诉道旅，酒店哪个信息出错了",
            "key": null,
            "rawHtml": "告诉道旅，酒店哪个信息出错了",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Tell us which hotel has content mistake",
        "target_identifier": "Tell us which hotel has content mistake",
        "target_parts": [
          {
            "displayHtml": "Tell us which hotel has content mistake",
            "identifier": "Tell us which hotel has content mistake",
            "key": null,
            "rawHtml": "Tell us which hotel has content mistake",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_FeedbackType|~|告诉道旅，酒店哪个信息出错了|~",
        "__key_for_search_target__": "~|Tell us which hotel has content mistake|~|Tell us which hotel has content mistake|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 313,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 52,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Error_FeedbackSubtypeRequired",
        "meaning": null,
        "source": "请告诉我们哪个信息出错了~",
        "source_identifier": "请告诉我们哪个信息出错了~",
        "source_parts": [
          {
            "displayHtml": "请告诉我们哪个信息出错了~",
            "identifier": "请告诉我们哪个信息出错了~",
            "key": null,
            "rawHtml": "请告诉我们哪个信息出错了~",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Tell us which content is wrong",
        "target_identifier": "Tell us which content is wrong",
        "target_parts": [
          {
            "displayHtml": "Tell us which content is wrong",
            "identifier": "Tell us which content is wrong",
            "key": null,
            "rawHtml": "Tell us which content is wrong",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Error_FeedbackSubtypeRequired|~|请告诉我们哪个信息出错了~|~",
        "__key_for_search_target__": "~|Tell us which content is wrong|~|Tell us which content is wrong|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 318,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 58,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_Feedback_ShouldModify2",
        "meaning": null,
        "source": "应修改为",
        "source_identifier": "应修改为",
        "source_parts": [
          {
            "displayHtml": "应修改为",
            "identifier": "应修改为",
            "key": null,
            "rawHtml": "应修改为",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Should change to",
        "target_identifier": "Should change to",
        "target_parts": [
          {
            "displayHtml": "Should change to",
            "identifier": "Should change to",
            "key": null,
            "rawHtml": "Should change to",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Feedback_ShouldModify2|~|应修改为|~",
        "__key_for_search_target__": "~|Should change to|~|Should change to|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 320,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 347,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 369,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-submit/ticket-submit.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/order/order/order-insurance/order-insurance.component.html"
          },
          {
            "lineNumber": 103,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-percheck/invoice-percheck-info/invoice-percheck-info.component.html"
          },
          {
            "lineNumber": 116,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-percheck/invoice-percheck-info/invoice-percheck-info.component.html"
          },
          {
            "lineNumber": 130,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-percheck/invoice-percheck-info/invoice-percheck-info.component.html"
          },
          {
            "lineNumber": 60,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-info-edit/invoice-info-edit.component.html"
          },
          {
            "lineNumber": 73,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-info-edit/invoice-info-edit.component.html"
          },
          {
            "lineNumber": 87,
            "sourceFile": "apps/main-app/src/app/invoice/invoice-info-edit/invoice-info-edit.component.html"
          },
          {
            "lineNumber": 44,
            "sourceFile": "apps/booking-app/src/app/tickets/ticket-submit/hotel-ticket-submit/guest-picker/guest-picker.component.html"
          }
        ],
        "description": null,
        "key": "Label_Optional",
        "meaning": null,
        "source": "选填",
        "source_identifier": "选填",
        "source_parts": [
          {
            "displayHtml": "选填",
            "identifier": "选填",
            "key": null,
            "rawHtml": "选填",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Optional",
        "target_identifier": "Optional",
        "target_parts": [
          {
            "displayHtml": "Optional",
            "identifier": "Optional",
            "key": null,
            "rawHtml": "Optional",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Optional|~|选填|~",
        "__key_for_search_target__": "~|Optional|~|Optional|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 326,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 63,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_TheCorrectInfoIs",
        "meaning": null,
        "source": "正确的是...",
        "source_identifier": "正确的是...",
        "source_parts": [
          {
            "displayHtml": "正确的是...",
            "identifier": "正确的是...",
            "key": null,
            "rawHtml": "正确的是...",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "The correct one should be...",
        "target_identifier": "The correct one should be...",
        "target_parts": [
          {
            "displayHtml": "The correct one should be...",
            "identifier": "The correct one should be...",
            "key": null,
            "rawHtml": "The correct one should be...",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_TheCorrectInfoIs|~|正确的是...|~",
        "__key_for_search_target__": "~|The correct one should be...|~|The correct one should be...|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 332,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 71,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_Feedback_MyOpinion",
        "meaning": null,
        "source": "我想说",
        "source_identifier": "我想说",
        "source_parts": [
          {
            "displayHtml": "我想说",
            "identifier": "我想说",
            "key": null,
            "rawHtml": "我想说",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "I Want to Say",
        "target_identifier": "I Want to Say",
        "target_parts": [
          {
            "displayHtml": "I Want to Say",
            "identifier": "I Want to Say",
            "key": null,
            "rawHtml": "I Want to Say",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Feedback_MyOpinion|~|我想说|~",
        "__key_for_search_target__": "~|I Want to Say|~|I Want to Say|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 337,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 78,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_FeedbackContent",
        "meaning": null,
        "source": "请填写具体的建议反馈吧~",
        "source_identifier": "请填写具体的建议反馈吧~",
        "source_parts": [
          {
            "displayHtml": "请填写具体的建议反馈吧~",
            "identifier": "请填写具体的建议反馈吧~",
            "key": null,
            "rawHtml": "请填写具体的建议反馈吧~",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Please fill in feedback details",
        "target_identifier": "Please fill in feedback details",
        "target_parts": [
          {
            "displayHtml": "Please fill in feedback details",
            "identifier": "Please fill in feedback details",
            "key": null,
            "rawHtml": "Please fill in feedback details",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_FeedbackContent|~|请填写具体的建议反馈吧~|~",
        "__key_for_search_target__": "~|Please fill in feedback details|~|Please fill in feedback details|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 341,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 83,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Error_FeedbackContentRequired",
        "meaning": null,
        "source": "这里要填写哦~~",
        "source_identifier": "这里要填写哦~~",
        "source_parts": [
          {
            "displayHtml": "这里要填写哦~~",
            "identifier": "这里要填写哦~~",
            "key": null,
            "rawHtml": "这里要填写哦~~",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "This is required",
        "target_identifier": "This is required",
        "target_parts": [
          {
            "displayHtml": "This is required",
            "identifier": "This is required",
            "key": null,
            "rawHtml": "This is required",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Error_FeedbackContentRequired|~|这里要填写哦~~|~",
        "__key_for_search_target__": "~|This is required|~|This is required|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 352,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 94,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Placeholder_FeedbackEmail",
        "meaning": null,
        "source": "请填写联系邮箱，仅是为了同步反馈处理进度给您",
        "source_identifier": "请填写联系邮箱，仅是为了同步反馈处理进度给您",
        "source_parts": [
          {
            "displayHtml": "请填写联系邮箱，仅是为了同步反馈处理进度给您",
            "identifier": "请填写联系邮箱，仅是为了同步反馈处理进度给您",
            "key": null,
            "rawHtml": "请填写联系邮箱，仅是为了同步反馈处理进度给您",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Please enter your email. For the purpose of feedback status update only",
        "target_identifier": "Please enter your email. For the purpose of feedback status update only",
        "target_parts": [
          {
            "displayHtml": "Please enter your email. For the purpose of feedback status update only",
            "identifier": "Please enter your email. For the purpose of feedback status update only",
            "key": null,
            "rawHtml": "Please enter your email. For the purpose of feedback status update only",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Placeholder_FeedbackEmail|~|请填写联系邮箱，仅是为了同步反馈处理进度给您|~",
        "__key_for_search_target__": "~|Please enter your email. For the purpose of feedback status update only|~|Please enter your email. For the purpose of feedback status update only|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 357,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          }
        ],
        "description": null,
        "key": "Label_Submitting",
        "meaning": null,
        "source": "提交中...",
        "source_identifier": "提交中...",
        "source_parts": [
          {
            "displayHtml": "提交中...",
            "identifier": "提交中...",
            "key": null,
            "rawHtml": "提交中...",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Submitting...",
        "target_identifier": "Submitting...",
        "target_parts": [
          {
            "displayHtml": "Submitting...",
            "identifier": "Submitting...",
            "key": null,
            "rawHtml": "Submitting...",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Submitting|~|提交中...|~",
        "__key_for_search_target__": "~|Submitting...|~|Submitting...|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 361,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 348,
            "sourceFile": "apps/main-app/src/app/account/subaccount/subaccount.component.html"
          },
          {
            "lineNumber": 93,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-submit/ticket-submit.component.html"
          },
          {
            "lineNumber": 52,
            "sourceFile": "apps/main-app/src/app/user/invitation/invitation.component.html"
          },
          {
            "lineNumber": 152,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 55,
            "sourceFile": "apps/main-app/src/app/points/lottery/lottery.component.html"
          },
          {
            "lineNumber": 168,
            "sourceFile": "apps/main-app/src/app/points/shared/address/address.component.html"
          },
          {
            "lineNumber": 104,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Label_Submit",
        "meaning": null,
        "source": "提交",
        "source_identifier": "提交",
        "source_parts": [
          {
            "displayHtml": "提交",
            "identifier": "提交",
            "key": null,
            "rawHtml": "提交",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Submit",
        "target_identifier": "Submit",
        "target_parts": [
          {
            "displayHtml": "Submit",
            "identifier": "Submit",
            "key": null,
            "rawHtml": "Submit",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Submit|~|提交|~",
        "__key_for_search_target__": "~|Submit|~|Submit|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 370,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 112,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Title_FeedbackSuccess",
        "meaning": null,
        "source": "您的建议已提交，感谢！",
        "source_identifier": "您的建议已提交，感谢！",
        "source_parts": [
          {
            "displayHtml": "您的建议已提交，感谢！",
            "identifier": "您的建议已提交，感谢！",
            "key": null,
            "rawHtml": "您的建议已提交，感谢！",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Your feedback is submitted. Thank you.",
        "target_identifier": "Your feedback is submitted. Thank you.",
        "target_parts": [
          {
            "displayHtml": "Your feedback is submitted. Thank you.",
            "identifier": "Your feedback is submitted. Thank you.",
            "key": null,
            "rawHtml": "Your feedback is submitted. Thank you.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Title_FeedbackSuccess|~|您的建议已提交，感谢！|~",
        "__key_for_search_target__": "~|Your feedback is submitted. Thank you.|~|Your feedback is submitted. Thank you.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 372,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 113,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          }
        ],
        "description": null,
        "key": "Text_Desc_FeedbackSuccess",
        "meaning": null,
        "source": "我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！",
        "source_identifier": "我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！",
        "source_parts": [
          {
            "displayHtml": "我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！",
            "identifier": "我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！",
            "key": null,
            "rawHtml": "我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.",
        "target_identifier": "We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.",
        "target_parts": [
          {
            "displayHtml": "We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.",
            "identifier": "We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.",
            "key": null,
            "rawHtml": "We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Desc_FeedbackSuccess|~|我们可能无法回复您的每一条建议，但您的建议定将帮助我们逐步完善平台网站，祝您生活愉快！|~",
        "__key_for_search_target__": "~|We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.|~|We may not able to reply every single feedback, but your advice will definitely help us to improve our platform. Have a nice day.|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 375,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/sidebar/sidebar.component.html"
          },
          {
            "lineNumber": 13,
            "sourceFile": "apps/main-app/src/app/shared/components/message-modal/message-modal.component.html"
          },
          {
            "lineNumber": 322,
            "sourceFile": "apps/main-app/src/app/hotels/hotel-detail/hotel-detail.component.html"
          },
          {
            "lineNumber": 375,
            "sourceFile": "apps/main-app/src/app/account/subaccount/subaccount.component.html"
          },
          {
            "lineNumber": 71,
            "sourceFile": "apps/main-app/src/app/account/change-password/change-password.component.html"
          },
          {
            "lineNumber": 32,
            "sourceFile": "apps/main-app/src/app/account/change-email/change-email.component.html"
          },
          {
            "lineNumber": 50,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 113,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 119,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 131,
            "sourceFile": "apps/main-app/src/app/tickets/ticket-modal/ticket-modal.component.html"
          },
          {
            "lineNumber": 147,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 155,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 216,
            "sourceFile": "apps/main-app/src/app/points/point-market/point-market.component.html"
          },
          {
            "lineNumber": 180,
            "sourceFile": "apps/main-app/src/app/points/point-cart/point-cart.component.html"
          },
          {
            "lineNumber": 163,
            "sourceFile": "apps/main-app/src/app/points/point-redeem/point-redeem.component.html"
          },
          {
            "lineNumber": 29,
            "sourceFile": "apps/main-app/src/app/points/lottery/lottery.component.html"
          },
          {
            "lineNumber": 67,
            "sourceFile": "apps/main-app/src/app/points/lottery/lottery.component.html"
          },
          {
            "lineNumber": 163,
            "sourceFile": "apps/main-app/src/app/points/shared/address/address.component.html"
          },
          {
            "lineNumber": 171,
            "sourceFile": "apps/main-app/src/app/points/shared/address/address.component.html"
          },
          {
            "lineNumber": 117,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/side-toolkit/side-toolkit-feedback/side-toolkit-feedback.component.html"
          },
          {
            "lineNumber": 240,
            "sourceFile": "apps/booking-app/src/app/bookings/list/booking-list.component.html"
          }
        ],
        "description": null,
        "key": "Label_Confirm",
        "meaning": null,
        "source": "确定",
        "source_identifier": "确定",
        "source_parts": [
          {
            "displayHtml": "确定",
            "identifier": "确定",
            "key": null,
            "rawHtml": "确定",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "OK",
        "target_identifier": "OK",
        "target_parts": [
          {
            "displayHtml": "OK",
            "identifier": "OK",
            "key": null,
            "rawHtml": "OK",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_Confirm|~|确定|~",
        "__key_for_search_target__": "~|OK|~|OK|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 24,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 8,
            "sourceFile": "apps/main-app/src/app/promotion/hotel/hotel.component.html"
          },
          {
            "lineNumber": 9,
            "sourceFile": "apps/main-app/src/app/promotion/hotline/hotline.component.html"
          },
          {
            "lineNumber": 5,
            "sourceFile": "apps/main-app/src/app/promotion/hotline-list/hotline-list.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_HotelFind",
        "meaning": null,
        "source": "预订酒店",
        "source_identifier": "预订酒店",
        "source_parts": [
          {
            "displayHtml": "预订酒店",
            "identifier": "预订酒店",
            "key": null,
            "rawHtml": "预订酒店",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Find Hotel",
        "target_identifier": "Find Hotel",
        "target_parts": [
          {
            "displayHtml": "Find Hotel",
            "identifier": "Find Hotel",
            "key": null,
            "rawHtml": "Find Hotel",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_HotelFind|~|预订酒店|~",
        "__key_for_search_target__": "~|Find Hotel|~|Find Hotel|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 30,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_TransferService",
        "meaning": null,
        "source": "接送机",
        "source_identifier": "接送机",
        "source_parts": [
          {
            "displayHtml": "接送机",
            "identifier": "接送机",
            "key": null,
            "rawHtml": "接送机",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Airport Transfers",
        "target_identifier": "Airport Transfers",
        "target_parts": [
          {
            "displayHtml": "Airport Transfers",
            "identifier": "Airport Transfers",
            "key": null,
            "rawHtml": "Airport Transfers",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_TransferService|~|接送机|~",
        "__key_for_search_target__": "~|Airport Transfers|~|Airport Transfers|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 40,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 48,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 2,
            "sourceFile": "apps/main-app/src/app/transfers/transfer-booking/detail/transfer-booking-detail.component.html"
          },
          {
            "lineNumber": 39,
            "sourceFile": "apps/main-app/src/app/transfers/transfer-booking/list/transfer-booking-list.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/main-app/src/app/bookings/booking-list/booking-list.component.html"
          },
          {
            "lineNumber": 12,
            "sourceFile": "apps/main-app/src/app/bookings/booking-list/booking-list.component.html"
          },
          {
            "lineNumber": 2,
            "sourceFile": "apps/main-app/src/app/bookings/booking-detail/booking-detail.component.html"
          },
          {
            "lineNumber": 35,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/navbar/navbar.component.html"
          },
          {
            "lineNumber": 32,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/navbar/navbar.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/booking-app/src/app/shared/booking-navbar/booking-navbar.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/booking-app/src/app/bookings/list/booking-list.component.html"
          }
        ],
        "description": null,
        "key": "Title_BookingManagement",
        "meaning": null,
        "source": "订单管理",
        "source_identifier": "订单管理",
        "source_parts": [
          {
            "displayHtml": "订单管理",
            "identifier": "订单管理",
            "key": null,
            "rawHtml": "订单管理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Booking",
        "target_identifier": "Booking",
        "target_parts": [
          {
            "displayHtml": "Booking",
            "identifier": "Booking",
            "key": null,
            "rawHtml": "Booking",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_BookingManagement|~|订单管理|~",
        "__key_for_search_target__": "~|Booking|~|Booking|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 54,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_TicketManagement",
        "meaning": null,
        "source": "工单管理",
        "source_identifier": "工单管理",
        "source_parts": [
          {
            "displayHtml": "工单管理",
            "identifier": "工单管理",
            "key": null,
            "rawHtml": "工单管理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Ticket Management",
        "target_identifier": "Ticket Management",
        "target_parts": [
          {
            "displayHtml": "Ticket Management",
            "identifier": "Ticket Management",
            "key": null,
            "rawHtml": "Ticket Management",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_TicketManagement|~|工单管理|~",
        "__key_for_search_target__": "~|Ticket Management|~|Ticket Management|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 62,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_BillManagement",
        "meaning": null,
        "source": "账单管理",
        "source_identifier": "账单管理",
        "source_parts": [
          {
            "displayHtml": "账单管理",
            "identifier": "账单管理",
            "key": null,
            "rawHtml": "账单管理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Billing Management",
        "target_identifier": "Billing Management",
        "target_parts": [
          {
            "displayHtml": "Billing Management",
            "identifier": "Billing Management",
            "key": null,
            "rawHtml": "Billing Management",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_BillManagement|~|账单管理|~",
        "__key_for_search_target__": "~|Billing Management|~|Billing Management|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 70,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_InvoiceManagement",
        "meaning": null,
        "source": "发票管理",
        "source_identifier": "发票管理",
        "source_parts": [
          {
            "displayHtml": "发票管理",
            "identifier": "发票管理",
            "key": null,
            "rawHtml": "发票管理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Invoice Management",
        "target_identifier": "Invoice Management",
        "target_parts": [
          {
            "displayHtml": "Invoice Management",
            "identifier": "Invoice Management",
            "key": null,
            "rawHtml": "Invoice Management",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_InvoiceManagement|~|发票管理|~",
        "__key_for_search_target__": "~|Invoice Management|~|Invoice Management|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 78,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/main-app/src/app/transfers/transfer-booking/list/transfer-booking-list.component.html"
          },
          {
            "lineNumber": 48,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Title_TransferBookingManagement",
        "meaning": null,
        "source": "接送机订单管理",
        "source_identifier": "接送机订单管理",
        "source_parts": [
          {
            "displayHtml": "接送机订单管理",
            "identifier": "接送机订单管理",
            "key": null,
            "rawHtml": "接送机订单管理",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Airport Transfer Booking",
        "target_identifier": "Airport Transfer Booking",
        "target_parts": [
          {
            "displayHtml": "Airport Transfer Booking",
            "identifier": "Airport Transfer Booking",
            "key": null,
            "rawHtml": "Airport Transfer Booking",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Title_TransferBookingManagement|~|接送机订单管理|~",
        "__key_for_search_target__": "~|Airport Transfer Booking|~|Airport Transfer Booking|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 91,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 99,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/user/invitation/invitation.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/user/address/address.component.html"
          },
          {
            "lineNumber": 75,
            "sourceFile": "apps/main-app/src/app/points/point-index/point-index.component.html"
          },
          {
            "lineNumber": 1,
            "sourceFile": "apps/main-app/src/app/points/point-market/point-market.component.html"
          },
          {
            "lineNumber": 10,
            "sourceFile": "apps/main-app/src/app/points/point-market/point-market.component.html"
          },
          {
            "lineNumber": 9,
            "sourceFile": "apps/main-app/src/app/points/point-cart/point-cart.component.html"
          },
          {
            "lineNumber": 9,
            "sourceFile": "apps/main-app/src/app/points/point-redeem/point-redeem.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/points/redeem-record/redeem-record.component.html"
          }
        ],
        "description": null,
        "key": "Label_PointsMarket",
        "meaning": null,
        "source": "积分商城",
        "source_identifier": "积分商城",
        "source_parts": [
          {
            "displayHtml": "积分商城",
            "identifier": "积分商城",
            "key": null,
            "rawHtml": "积分商城",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Points Market",
        "target_identifier": "Points Market",
        "target_parts": [
          {
            "displayHtml": "Points Market",
            "identifier": "Points Market",
            "key": null,
            "rawHtml": "Points Market",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Label_PointsMarket|~|积分商城|~",
        "__key_for_search_target__": "~|Points Market|~|Points Market|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 103,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_MyPoints",
        "meaning": null,
        "source": "我的积分",
        "source_identifier": "我的积分",
        "source_parts": [
          {
            "displayHtml": "我的积分",
            "identifier": "我的积分",
            "key": null,
            "rawHtml": "我的积分",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Points",
        "target_identifier": "Points",
        "target_parts": [
          {
            "displayHtml": "Points",
            "identifier": "Points",
            "key": null,
            "rawHtml": "Points",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_MyPoints|~|我的积分|~",
        "__key_for_search_target__": "~|Points|~|Points|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 111,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_MyCoupons",
        "meaning": null,
        "source": "我的优惠券",
        "source_identifier": "我的优惠券",
        "source_parts": [
          {
            "displayHtml": "我的优惠券",
            "identifier": "我的优惠券",
            "key": null,
            "rawHtml": "我的优惠券",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "My Coupons",
        "target_identifier": "My Coupons",
        "target_parts": [
          {
            "displayHtml": "My Coupons",
            "identifier": "My Coupons",
            "key": null,
            "rawHtml": "My Coupons",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_MyCoupons|~|我的优惠券|~",
        "__key_for_search_target__": "~|My Coupons|~|My Coupons|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 124,
            "sourceFile": "apps/main-app/src/app/shared/components/layout/navbar/navbar.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/home/news/news-index/news-index.component.html"
          },
          {
            "lineNumber": 4,
            "sourceFile": "apps/main-app/src/app/home/news/news-detail/news-detail.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/account/register/register.component.html"
          },
          {
            "lineNumber": 6,
            "sourceFile": "apps/main-app/src/app/account/login/login.component.html"
          },
          {
            "lineNumber": 7,
            "sourceFile": "apps/main-app/src/app/account/password-find/password-find.component.html"
          },
          {
            "lineNumber": 7,
            "sourceFile": "apps/main-app/src/app/account/password-reset/password-reset.component.html"
          }
        ],
        "description": null,
        "key": "Text_Nav_Home",
        "meaning": null,
        "source": "首页",
        "source_identifier": "首页",
        "source_parts": [
          {
            "displayHtml": "首页",
            "identifier": "首页",
            "key": null,
            "rawHtml": "首页",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Home",
        "target_identifier": "Home",
        "target_parts": [
          {
            "displayHtml": "Home",
            "identifier": "Home",
            "key": null,
            "rawHtml": "Home",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Nav_Home|~|首页|~",
        "__key_for_search_target__": "~|Home|~|Home|~"
      }
    ],
    loaded: false,
    filtering: false,
  },
  pagination: {
    totalAmount: 0,
    pageNum: 1,
    pageSize: 50,
  },

  statusBar: {
    counters: {
      needHandleCount: 0,
      signedOffUnitCount: 0,
      totalUnitCount: 0
    },
    process: {
      commandByHash: {},
      finished: true,
      hasError: false,
    },
  }
};