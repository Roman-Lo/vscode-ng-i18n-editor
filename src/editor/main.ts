import * as antd from 'ant-design-vue';
import { Webview } from 'vscode';
import Vue from 'vue';
import { MOCK_DATA } from './mock-data';
import { timeStamp } from 'console';

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
    searchOptions: {
      key: null,
      state: ['new','needs-translation','signed-off','translated'],
      pageNum: 1,
      pageSize: 10,
    },
    transUnitTable: {
      sourceLocale: '',
      targetLocale: '',
      editingUnit: null,
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
      // filter events
      selectStateFilter(state: i18n.TranslationStateType, checked: boolean) {
        const idx = pageData.searchOptions.state.indexOf(state);
        if (checked && idx === -1) {
          pageData.searchOptions.state.push(state);
        } else if (!checked && idx >= 0) {
          pageData.searchOptions.state.splice(idx, 1);
        }
      },

      // editor events
      startTranslation(record: i18nWebView.ITransUnitView, $event: FocusEvent) {
        const { editingUnit: curEditState } = pageData.transUnitTable;
        if (curEditState) {
          if (curEditState.key === record.key) {
            return;
          } else {
            if (!this.endTranslation(curEditState.ref, $event)) {
              return;
            }
          }
        }
        const editingUnitState: i18nWebView.IWebViewEditingUnitState = {
          key: record.key,
          editorValue: '',
          availableTags: [],
          allTags: record.source_parts?.filter(x => x.type === 'ph_tag')?.map(x => x.key as string) ?? ([] as string[]),
          error: null,
          ref: record,
        };
        // build editor value
        const editorValueParts: string[] = [];
        const tagDict = editingUnitState.allTags.reduce<{ [key: string]: boolean }>((a, v) => {
          a[v] = true;
          return a;
        }, {});
        record.target_parts?.forEach(p => {
          if (p.type === 'text') {
            editorValueParts.push(p.displayHtml);
          } else if (p.type === 'ph_tag' && p.key) {
            editorValueParts.push(` #${p.key} `);
            // delete tagDict[p.key];
          }
        });
        const availableTags = Object.keys(tagDict);
        editingUnitState.availableTags = availableTags;
        editingUnitState.editorValue = editorValueParts.join('');
        pageData.transUnitTable.editingUnit = editingUnitState;
        this.$nextTick().then(() => {
          const containerEl = (this.$refs['editor-div'] as HTMLElement);
          containerEl.getElementsByTagName('textarea')[0]?.focus();
        });
        console.log(`start edit trans unit: ${record.key}`);
      },
      editorBlur(record: i18nWebView.ITransUnitView, $event: FocusEvent) {
        const { editingUnit: curEditState } = pageData.transUnitTable;
        if ((curEditState as any).__skip_blur) {
          (curEditState as any).__skip_blur = false;
          return;
        }
        this.endTranslation(record, $event);
      },
      editorValueChange(value: string) {
        if (pageData.transUnitTable.editingUnit) {
          const {
            allTags
          } = pageData.transUnitTable.editingUnit;
          const availables = allTags.filter(needle => value.indexOf(`#${needle}`) < 0);
          pageData.transUnitTable.editingUnit.availableTags = availables;
        }
      },
      tagSelected(option: { value: string }, prefix: string) {
        const { editingUnit: curEditState } = pageData.transUnitTable;
        if (curEditState) {
          (curEditState as any).__skip_blur = true; // mark skip blur
        }
      },
      endTranslation(record: i18nWebView.ITransUnitView, $event: FocusEvent): boolean {
        const { editingUnit: curEditState } = pageData.transUnitTable;
        if (!curEditState) {
          return true;
        }
        if (curEditState.key === record.key) {
          // sync target 
          const {
            allTags, editorValue
          } = curEditState;
          const tagCounter: { [key: string]: number } = {};
          const tagNeedleDict = allTags.reduce<{ [key: string]: string }>((a, v) => {
            a[`#${v}`] = v;
            tagCounter[v] = 0;
            return a;
          }, {});

          const parts: i18n.I18nHtmlPart[] = [];
          let buffer: string[] = [];
          let target: string = '';
          let targetIdfr: string = '';
          const pushTextPartFromBuffer = (bArr: string[]) => {
            const textContent = bArr.join(' ').trim();
            if (textContent.length > 0) {
              parts.push({
                key: null,
                type: 'text',
                displayHtml: textContent,
                rawHtml: textContent,
                identifier: textContent,
              });
              target += textContent;
              targetIdfr += textContent;
            }
          };

          editorValue.split(' ').forEach(buf => {
            if (tagNeedleDict[buf]) {
              pushTextPartFromBuffer(buffer);
              // push tag 
              const tagKey = tagNeedleDict[buf];
              const srcPart = record.source_parts?.find(x => x.key === tagKey);
              if (srcPart) {
                target += srcPart.rawHtml;
                targetIdfr += srcPart.identifier;
                tagCounter[tagKey]++;
                parts.push(srcPart);
              }
              // clear buffer
              buffer = [];
            } else {
              buffer.push(buf);
            }
          });
          pushTextPartFromBuffer(buffer);

          const missingKeys: string[] = [];
          const duplicateKeys: string[] = [];
          let hasError = false;
          Object.keys(tagCounter).forEach(tagKey => {
            const count = tagCounter[tagKey];
            if (count === 1) {
              return;
            }
            if (count === 0) {
              missingKeys.push(tagKey);
              hasError = true;
            } else {
              duplicateKeys.push(tagKey);
              hasError = true;
            }
          });
          if (hasError) {
            let errors = [];
            errors.push(...missingKeys.map(x => `Missing placeholder '${x}';`));
            errors.push(...duplicateKeys.map(x => `Placeholder '${x}' declared more than once;`));
            curEditState.error = errors.join(' ');
            ($event.srcElement as HTMLElement).focus();
            return false;
          }
          record.target = target;
          record.target_parts = parts;
          record.target_identifier = targetIdfr;
          record.state = target.length === 0 ? 'needs-translation' : 'translated';
          console.log(`key: ${record.key}, translation updated to: ${record.target}`);
        }

        pageData.transUnitTable.editingUnit = null;
        console.log(`end translating: ${record.key}`);

        if (pageData.settings.translationSaveOn === 'blur') {
          this.updateTransUnit(record);
        }
        return true;
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
            _caret_pos: 0,
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
        const max = totalAmount - 1;
        const start = Math.min((pageNum - 1) * pageSize, max);
        const end = Math.min(start + pageSize, max);
        pageData.transUnitTable.transUnits = _transUnits; //.slice(start, end);
        console.log(`transunits:`, JSON.stringify(pageData.transUnitTable.transUnits));
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
