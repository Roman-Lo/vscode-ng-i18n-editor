import * as antd from 'ant-design-vue';
import Vue from 'vue';
import { MOCK_DATA } from './mock-data';

if (!isInVsCodeIDE) {
  console.log(MOCK_DATA.a);
}

interface ITransUnitView extends i18n.TransUnit {
  updating: boolean;
  commandHash: string | null;
  error?: string | null;

  __key_for_search__: string;
}

interface IWebViewPageData {
  settings: {
    mode: 'git-control' | 'db-control';
    translationSaveOn: 'blur' | 'change' | 'manual';
  };
  xliffFiles: string[];
  selectedXliffFile: string | null;
  xliffFileLoading: boolean;
  searchOptions: {
    key: string | null;
    state: i18n.TranslationStateType | 'all';
    pageSize: number;
    pageNum: number;
  }


  transUnits: ITransUnitView[];
  totalAmount: number;
  pageSize: number;
  pageNum: number;
  // counters?: {
  //   needHandle: number;
  //   translated: number;
  // }
}


export function bootstrap() {
  console.log('loaded!');

  let _transUnits: ITransUnitView[] = [];
  let _transUnitsByKey: { [key: string]: ITransUnitView } = {};

  const pageData: IWebViewPageData = {
    xliffFiles: [],
    selectedXliffFile: null,
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
    transUnits: [],
    totalAmount: 0,
    pageNum: 1,
    pageSize: 10,
  };
  Vue.use(antd);
  var app = new Vue({
    el: '#app',
    data: pageData,
    mounted() {
      document.getElementById('app')?.removeAttribute('pending');
      this.loadXliffFiles();
    },
    methods: {
      loadXliffFiles() {
        sendCommand('list-xliff-files', Object.assign(generateCommandBase(), {
          dir: '.'
        }));
      },
      loadXliffContent() {
        const file = pageData.selectedXliffFile;
        if (file) {
          sendCommand('load-xliff-file', Object.assign(generateCommandBase(), {
            xliffFile: file
          }));
        }
      },
      markAsTranslated(transUnit: ITransUnitView) {
        transUnit.state = 'translated';
        this.updateTransUnit(transUnit);
      },
      markAsSignedOff(transUnit: ITransUnitView) {
        transUnit.state = 'signed-off';
        this.updateTransUnit(transUnit);
      },
      updateTransUnit(transUnit: ITransUnitView) {
        if (pageData.selectedXliffFile) {
          let cmdBase = generateCommandBase();
          transUnit.updating = true;
          transUnit.commandHash = cmdBase.hash;
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
          vscode.postMessage({
            command: 'ready',
            data: null
          });
        } else {
        }
      }
    }
  });

  var errorDetect = (data: ExtResultCallbackEvent) => {
    // 指令级别失败
    if (data.error) {
      app.$error({
        title: '命令执行失败',
        content: `
          <div>
            <p>命令 '${data.commandName}' 执行失败：${data.error.message} [${data.error.code}]. Hash: ${data.hash}.</p>
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
        if (pageData.selectedXliffFile && data.files.indexOf(pageData.selectedXliffFile) < 0) {
          // clear data
          pageData.selectedXliffFile = null;
          _transUnits = [];
          _transUnitsByKey = {};
          pageData.transUnits = [];
          pageData.pageNum = 1;
          pageData.totalAmount = 0;
        }
      }
    },
    'xliff-file-loaded': (data: i18nWebView.I18nTranslateWebViewCommandMap['xliff-file-loaded']) => {
      if (errorDetect(data) && pageData.selectedXliffFile === data.xliffFile) {
        let transUnits: ITransUnitView[] = [];
        let transUnitsByKey: { [key: string]: ITransUnitView } = {};
        data.transUnits.forEach(t => {
          let viewObj: ITransUnitView = Object.assign(t, {
            updating: false,
            commandHash: null,
            error: null,
            __key_for_search__: `~|${t.key}|~|${t.source}|~|${t.meaning}|~|${t.description}|~`
          });
          transUnits.push(viewObj);
          transUnitsByKey[viewObj.key] = viewObj;
        });
        _transUnits = transUnits;
        _transUnitsByKey = transUnitsByKey;
        pageData.totalAmount = _transUnits.length;
        pageData.pageNum = 1;
        pageData.transUnits = _transUnits.slice(pageData.pageNum, Math.min(pageData.pageSize, _transUnits.length));
        pageData.xliffFileLoading = false;
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
            if (tar.commandHash === data.commandHash) {
              // hash matched!
              tar.updating = false;
              tar.error = data.errors[transUnit.key];
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
              xliffFile: data.xliffFile
            }));
          }
        });
      }
    }
  };


  window.addEventListener('message', (event) => {
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
    if (isInVsCodeIDE) {
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
