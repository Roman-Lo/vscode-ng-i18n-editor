import * as antd from 'ant-design-vue';
import { Webview } from 'vscode';
import Vue from 'vue';
import { MOCK_DATA } from './mock-data';

declare var isInVsCodeIDE: boolean;
declare var transUnitTableColumns: { [key: string]: any }[];
let vscode: Webview | null = null;
try {
  if (isInVsCodeIDE) {
    vscode = acquireVsCodeApi();
  }
} catch (e) {
  isInVsCodeIDE = false;
}

if (!isInVsCodeIDE) {
  console.log(`using mock data:`, MOCK_DATA);
  if (MOCK_DATA) {
    MOCK_DATA.transUnitTable.columns = transUnitTableColumns;
  }
} else {

}

export function bootstrap() {
  console.log('loaded!');

  let _transUnits: i18nWebView.ITransUnitView[] = [];
  let _transUnitsByKey: { [key: string]: i18nWebView.ITransUnitView } = {};

  const pageData: i18nWebView.IWebViewPageData = isInVsCodeIDE ? {
    xliffFiles: [],
    locales: [],
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
      sourceLocale: '',
      targetLocale: '',
      columns: transUnitTableColumns,
      transUnits: [],
      loaded: false,
    },
    pagination: {
      totalAmount: 0,
      pageNum: 1,
      pageSize: 10,
    }
  } : MOCK_DATA;
  Vue.use(antd);
  var app = new Vue({
    el: '#app',
    data: pageData,
    mounted() {
      document.getElementById('app')?.removeAttribute('pending');
      this.loadXliffFiles();
    },
    methods: {
      // ui event triggers
      onSelectedFileChange(file: string) {
        this.selectedXliffFile = file;
        this.loadXliffContent();
      },
      onSelectedTargetLocale(locale: string) {
        this.selectedTargetLocale = locale;
        this.loadXliffContent();
      },
      targetTextBlur(record: i18nWebView.ITransUnitView, $event: FocusEvent) {
        record.target = ($event.target as Element).innerHTML;
        console.log(`key: ${record.key}, translation updated to: ${record.target}`);
      },

      // command caller
      loadXliffFiles() {
        sendCommand('list-xliff-files', Object.assign(generateCommandBase(), {
          dir: '.',
        }));
      },
      loadXliffContent() {
        const file = pageData.selectedXliffFile;
        const locale = pageData.selectedTargetLocale;
        if (file && locale) {
          this.xliffFileLoading = true;
          this.transUnitTable.loaded = false;
          sendCommand('load-xliff-file', Object.assign(generateCommandBase(), {
            xliffFile: file,
            locale: locale
          }));
          if (MOCK_DATA) {
            setTimeout(() => {
              this.xliffFileLoading = false;
              this.transUnitTable.loaded = true;
            }, 1000);
          }
        }
      },
      markAsTranslated(transUnit: i18nWebView.ITransUnitView) {
        transUnit.state = 'translated';
        this.updateTransUnit(transUnit);
      },
      markAsSignedOff(transUnit: i18nWebView.ITransUnitView) {
        transUnit.state = 'signed-off';
        this.updateTransUnit(transUnit);
      },
      updateTransUnit(transUnit: i18nWebView.ITransUnitView) {
        if (pageData.selectedXliffFile) {
          let cmdBase = generateCommandBase();
          transUnit._updating = true;
          transUnit._commandHash = cmdBase.hash;
          sendCommand('update-trans-unit',
            Object.assign(cmdBase, {
              xliffFile: pageData.selectedXliffFile,
              transUnits: [transUnit],
            })
          );
        }
      },
      search(pageNum: number) {

      },
      triggerReady() {
        if (isInVsCodeIDE) {
          vscode?.postMessage({
            command: 'ready',
            data: null
          });
        } else {
        }
      }
    }
  });

  var errorDetect = (data: ExtResultCallbackEvent) => {
    // upper level error
    if (data.error) {
      app.$error({
        title: 'Command Execution Failed',
        content: `
          <div>
            <p>Failed to execute: '${data.commandName}', error: ${data.error.message} [${data.error.code}]. Hash: ${data.hash}.</p>
          </div>
        `
      });
      return false;
    }
    return true;
  };

  const handlers: { [key: string]: (data: any) => void } = {
    'list-xliff-files-loaded': (data: i18nWebView.I18nTranslateWebViewCommandMap['list-xliff-files-loaded']) => {
      if (errorDetect(data)) {
        pageData.xliffFiles = data.files;
        pageData.locales = data.locales;
        if (pageData.selectedXliffFile && data.files.findIndex(x => x.path === pageData.selectedXliffFile) < 0) {
          // clear data
          pageData.selectedXliffFile = null;
          _transUnits = [];
          _transUnitsByKey = {};
          pageData.transUnitTable.sourceLocale = '';
          pageData.transUnitTable.targetLocale = '';
          pageData.transUnitTable.transUnits = [];
          pageData.pagination.totalAmount = 0;
          pageData.pagination.pageNum = 1;
        }
      }
    },
    'xliff-file-loaded': (data: i18nWebView.I18nTranslateWebViewCommandMap['xliff-file-loaded']) => {
      pageData.xliffFileLoading = false;
      pageData.transUnitTable.loaded = true;
      if (errorDetect(data) &&
        pageData.selectedXliffFile === data.xliffFile &&
        pageData.selectedTargetLocale === data.targetLangCode
      ) {
        let transUnits: i18nWebView.ITransUnitView[] = [];
        let transUnitsByKey: { [key: string]: i18nWebView.ITransUnitView } = {};
        data.transUnits.forEach(t => {
          let viewObj: i18nWebView.ITransUnitView = Object.assign(t, {
            _updating: false,
            _commandHash: null,
            _error: null,
            __key_for_search__: `~|${[t.key, t.source_identifier, t.meaning, t.description].filter(x => x !== null).join('|~|')}|~`
          });
          transUnits.push(viewObj);
          transUnitsByKey[viewObj.key] = viewObj;
        });
        _transUnits = transUnits;
        _transUnitsByKey = transUnitsByKey;
        pageData.transUnitTable.sourceLocale = data.sourceLangCode;
        pageData.transUnitTable.targetLocale = data.targetLangCode;
        pageData.pagination.totalAmount = _transUnits.length;
        pageData.pagination.pageNum = 1;
        const {
          totalAmount, pageNum, pageSize
        } = pageData.pagination;
        pageData.transUnitTable.transUnits = _transUnits.slice(pageNum, Math.min(pageSize, totalAmount));
      }
    },
    'trans-unit-code-ctx-loaded': (data: i18nWebView.I18nTranslateWebViewCommandMap['trans-unit-code-ctx-loaded']) => {
      if (errorDetect(data)) {
        // TODO:
      }
    },
    'trans-unit-updated': (data: i18nWebView.I18nTranslateWebViewCommandMap['trans-unit-updated']) => {
      if (errorDetect(data)) {
        data.transUnits.forEach((transUnit) => {
          let tar = _transUnitsByKey[transUnit.key];
          if (!tar) {
            return; // skip if not found;
          } else {
            if (tar._commandHash === data.commandHash) {
              // hash matched!
              tar._updating = false;
              tar._error = data.errors[transUnit.key];
            }
          }
        });
      }
    },
    'xliff-file-updated': (data: i18nWebView.I18nTranslateWebViewCommandMap['xliff-file-updated']) => {
      if (data.triggerBy === 'ext' || data.xliffFile !== pageData.selectedXliffFile) {
        return;
      } else {
        // reload is needed！
        app.$warning({
          title: '文件修改提醒',
          content: `
          <div>
            <p>当前文件已被修改，页面即将重新加载。</p>
          </div>
          `,
          onOk() {
            let cmdBase = generateCommandBase();
            sendCommand('load-xliff-file', Object.assign(cmdBase, {
              xliffFile: data.xliffFile,
              locale: data.targetLangCode
            }));
          }
        });
      }
    }
  };


  window.addEventListener('message', (event) => {
    console.log(`message received`, event);
    const message = event.data as i18nWebView.I18nTranslateWebViewMessage<i18nWebView.CommandName>;
    if (handlers.hasOwnProperty(message.command)) {
      const handler = handlers[message.command];
      handler(message.data);
    }
  });



  function generateCommandBase(): ExtEventBase {
    const now = new Date();
    let base: ExtEventBase = {
      time: now,
      hash: now.getTime().toString(),
    };
    return base;
  }

  function sendCommand<K extends i18nWebView.CommandName>(
    name: K, command: i18nWebView.I18nTranslateWebViewCommandMap[K]
  ) {
    if (isInVsCodeIDE && vscode) {
      vscode.postMessage({
        command: name,
        data: command
      });
    } else {
      console.log(`Send Command: ${name}`, command);
    }
  }

  function getEventData<K extends i18nWebView.CommandName>(
    type: K, event: i18nWebView.I18nTranslateWebViewMessage<K>
  ): i18nWebView.I18nTranslateWebViewCommandMap[K] {
    return event.data;
  }
}
