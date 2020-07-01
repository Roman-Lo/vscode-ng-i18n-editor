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
  searchOptions: {
    key: null,
    state: ['new','needs-translation','signed-off','translated'],
    pageNum: 1,
    pageSize: 10,
  },
  transUnitTable: {
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
        "description": null,
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
        "__key_for_search__": "~|Text_Label_Destination|~|目的地|~"
      },
      {
        "contextGroups": [
          {
            "lineNumber": 13,
            "sourceFile": "libs/ngx-dida-uitk/src/lib/suggestion-typeahead/suggestion-typeahead.component.html"
          }
        ],
        "description": null,
        "key": "Text_Label_SearchByKeyword",
        "meaning": null,
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
        "__key_for_search__": "~|Text_Label_SearchByKeyword|~|搜关键字|~"
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
        "source_identifier": "只搜<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>内",
        "source_parts": [
          {
            "displayHtml": "只搜",
            "identifier": "只搜",
            "key": null,
            "rawHtml": "只搜",
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
            "displayHtml": "内",
            "identifier": "内",
            "key": null,
            "rawHtml": "内",
            "type": "text"
          }
        ],
        "state": "needs-translation",
        "target": "Only Search In <x id=\"START_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;span&gt;\" /><x id=\"INTERPOLATION\" equiv-text=\"{{ currentSelectedRegion.name }}\" /><x id=\"CLOSE_TAG_SPAN\" ctype=\"x-span\" equiv-text=\"&lt;/span&gt;\" />",
        "target_identifier": "Only Search In<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>",
        "target_parts": [
          {
            "displayHtml": "Only Search In",
            "identifier": "Only Search In",
            "key": null,
            "rawHtml": "Only Search In",
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
        "__key_for_search__": "~|Text_SuggestionTypeahead_SearchUnderRegion|~|只搜<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>内|~"
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
        "__key_for_search__": "~|Text_Placeholder_SuggestionTypeahead_CitySiteHotel|~|城市／地标／商圈／酒店|~"
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
        "__key_for_search__": "~|Text_SuggestionCategory_Region|~|区域/商圈|~"
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
        "__key_for_search__": "~|Text_SuggestionCategory_ViewPoint|~|热门景点|~"
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
        "__key_for_search__": "~|Text_SuggestionCategory_Hotel|~|酒店|~"
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
        "__key_for_search__": "~|Text_Info_Hotel|~|酒店|~"
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
        "__key_for_search__": "~|Text_Info_Airport|~|机场|~"
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
        "target_identifier": "<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>hotels nearby",
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
            "displayHtml": "hotels nearby",
            "identifier": "hotels nearby",
            "key": null,
            "rawHtml": "hotels nearby",
            "type": "text"
          }
        ],
        "_updating": false,
        "_commandHash": null,
        "_error": null,
        "__key_for_search__": "~|Text_Info_SuggestionTypeahead_Nearby|~|附近约<START_TAG_SPAN><INTERPOLATION><CLOSE_TAG_SPAN>间酒店|~"
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