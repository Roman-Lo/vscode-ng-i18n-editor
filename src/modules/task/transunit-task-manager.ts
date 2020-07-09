import * as vscode from 'vscode';
import { ExtensionSettingManager } from "../setting/ext-setting-manager";
import { ObjectUtils } from "../common/object.util";
import { Xliff } from '../xliff/xliff';

interface ICommandQueueItem {
  transUnit: i18n.TransUnit;
  hash: string;
  time: Date;
  cb: (result: i18nWebView.TransUnitUpdateResult) => void;
  omcb: (result: i18nWebView.TransUnitOmittedResult) => void;
}

export class EditorTransUnitUpdateTaskManager implements vscode.Disposable {
  static readonly DEFAULT_INTERVAL_SECONDS = 5;
  static readonly DEFAULT_ITEM_EACH_PACK = 10;

  private static readonly _g_instance_dict: { [key: string]: { fsPath: string, inst: EditorTransUnitUpdateTaskManager } } = {};

  private readonly queueItemByTransUnitKey: { [key: string]: ICommandQueueItem } = {};
  private readonly transUnitKeyQueue: string[] = [];
  // private readonly commandQueue: ICommandQueueItem[] = [];

  private __interval_pin__: any | null = null;
  private __executing__: boolean = false;
  private __last_write_time__: number = 0;
  private _setting!: II18nEditorTaskConfig;
  private _vs_subscriptions: vscode.Disposable[] = [];

  get activeTaskCount(): number {
    return this.transUnitKeyQueue.length;
  }

  get isRunning(): boolean {
    return this.__interval_pin__ !== null;
  }

  get isExecuting(): boolean {
    return this.__executing__;
  }

  get lastWriteTime(): number {
    return this.__last_write_time__;
  }

  static getManager(srcLocale: string, tarLocale: string, xliffUri: vscode.Uri): Thenable<EditorTransUnitUpdateTaskManager> {
    const key = EditorTransUnitUpdateTaskManager.buildCacheKey(srcLocale, tarLocale, xliffUri);
    let cached: { fsPath: string, inst: EditorTransUnitUpdateTaskManager } = EditorTransUnitUpdateTaskManager._g_instance_dict[key];
    if (cached) {
      if (cached.fsPath !== xliffUri.fsPath) {
        return Promise.reject(`xliff file path does not match! actual: ${cached.fsPath}, expected: ${xliffUri.fsPath};`);
      }
      return Promise.resolve(cached.inst);
    } else {
      return new Promise<EditorTransUnitUpdateTaskManager>((resolve, reject) => {
        vscode.workspace.fs.stat(xliffUri).then(
          (s) => {
            vscode.workspace.fs.readFile(xliffUri).then(
              (data) => {
                const content = new TextDecoder("utf-8").decode(data);
                const { sourceLocale, targetLocale } = Xliff.loadFileLocaleInfo(content, '');
                if (srcLocale !== sourceLocale) {
                  reject(`Unable to save trans units into '${xliffUri.fsPath}': source locale is not match, actual: ${sourceLocale}, expected: ${srcLocale}`);
                } else if (tarLocale !== targetLocale) {
                  reject(`Unable to save trans units into '${xliffUri.fsPath}': target locale is not match, actual: ${targetLocale}, expected: ${tarLocale}`);
                } else {
                  resolve(EditorTransUnitUpdateTaskManager.createManagerInstance(srcLocale, tarLocale, xliffUri, s.mtime));
                }
              },
              (err) => {
                reject(`failed to read xliff file '${xliffUri.fsPath}': ${err}`);
              }
            );
          },
          (reason) => {
            // file not exist
            resolve(EditorTransUnitUpdateTaskManager.createManagerInstance(srcLocale, tarLocale, xliffUri, 0));
          }
        );
      });
    }
  }

  private static createManagerInstance(srcLocale: string, tarLocale: string, xliffUri: vscode.Uri, mtime: number): EditorTransUnitUpdateTaskManager {
    const key = EditorTransUnitUpdateTaskManager.buildCacheKey(srcLocale, tarLocale, xliffUri);
    const inst = new EditorTransUnitUpdateTaskManager(srcLocale, tarLocale, xliffUri, mtime);
    EditorTransUnitUpdateTaskManager._g_instance_dict[key] = { fsPath: xliffUri.fsPath, inst: inst };
    return inst;
  }

  private static buildCacheKey(srcLocale: string, tarLocale: string, xliffUri: vscode.Uri) {
    return `${srcLocale}_${tarLocale}_${xliffUri.fsPath}`;
  }

  protected constructor(
    private readonly sourceLocale: string,
    private readonly targetLocale: string,
    private readonly targetFile: vscode.Uri,
    mtime: number
  ) {
    this.__last_write_time__ = mtime;
    this.init();
  }

  private init() {
    const settingManager = ExtensionSettingManager.getInstance();
    this.updateSetting(settingManager.setting?.editor?.taskConfig!);
    this.restart();
    settingManager.onSettingDidChange((setting) => {
      const updated = this.updateSetting(setting?.editor?.taskConfig!);
      if (updated) {
        this.restart();
      }
    });
  }

  /**
   * Update manager setting
   *
   * @private
   * @param {II18nEditorTaskConfig} cur
   * @returns {boolean} true: has updated, false: setting does not change
   * @memberof EditorTransUnitUpdateTaskManager
   */
  private updateSetting(cur: II18nEditorTaskConfig): boolean {
    const oldSetting = this._setting;
    const newSetting = cur || {};
    if (!newSetting.intervalSeconds) {
      newSetting.intervalSeconds = EditorTransUnitUpdateTaskManager.DEFAULT_INTERVAL_SECONDS;
    }
    if (!newSetting.itemEachPack) {
      newSetting.itemEachPack = EditorTransUnitUpdateTaskManager.DEFAULT_ITEM_EACH_PACK;
    }
    const differences = ObjectUtils.diff(oldSetting, newSetting);
    if (differences.length > 0) {
      this._setting = newSetting;
      return true;
    }
    return false;
  }

  private restart() {
    if (this.__interval_pin__) {
      clearInterval(this.__interval_pin__);
      this.__interval_pin__ = null;
    }
    let packCount = this._setting.itemEachPack!;
    this.__interval_pin__ = setInterval(() => {
      if (!this.__executing__) {
        if (this.activeTaskCount === 0) {
          return;
        }
        let endIdx = Math.min(this.transUnitKeyQueue.length, packCount);
        let pack: string[] = this.transUnitKeyQueue.splice(0, endIdx);
        this._next(pack);
      } else {
        packCount += this._setting.itemEachPack!;
      }
    }, this._setting.intervalSeconds! * 1000);
  }

  dispose() {
    try {
      this.flush();
    } catch (e) {

    }
  }

  pushCommand(
    cmd: i18nWebView.TransUnitUpdateCommand,
    eventSender: (result: i18nWebView.TransUnitUpdateResult) => void,
    omitEventSender: (result: i18nWebView.TransUnitOmittedResult) => void
  ) {
    cmd.transUnits.forEach(transUnit => {
      if (this.queueItemByTransUnitKey[transUnit.key]) {
        const item = this.queueItemByTransUnitKey[transUnit.key];
        const idx = this.transUnitKeyQueue.indexOf(transUnit.key);
        if (idx >= 0 && item.time <= cmd.time) {
          try {
            const now = new Date();
            const {
              omcb: pOMCB, hash: pHash, transUnit: pTransUnit,
            } = item;
            // sent post back event to remove webview task
            pOMCB({
              time: now,
              hash: now.getTime().toString(),
              commandHash: pHash,
              commandName: 'update-trans-unit-ommited',
              transUnitKey: pTransUnit.key,
              success: true,
              xliffFile: cmd.xliffFile
            });
          } catch (e) {
            console.error(`failed to send omit post back event`, e);
          }
          // omit previous item
          item.transUnit = transUnit;
          item.hash = cmd.hash;
          item.time = cmd.time;
          item.cb = eventSender;
          item.omcb = omitEventSender;
          // remove key from current queue
          this.transUnitKeyQueue.splice(idx, 1);
        }
      } else {
        this.queueItemByTransUnitKey[transUnit.key] = {
          transUnit: transUnit,
          hash: cmd.hash,
          time: cmd.time,
          cb: eventSender,
          omcb: omitEventSender,
        };
      }
      // enqueue
      this.transUnitKeyQueue.push(transUnit.key);
    });
  }

  flush() {
    const allItems = this.transUnitKeyQueue.slice(0, this.transUnitKeyQueue.length);
    this._next(allItems);
  }

  private _next(pack: string[]) {
    this.__executing__ = true;
    const reducer: Map<string, i18n.TransUnit[]> = new Map<string, i18n.TransUnit[]>();
    const transUnits: i18n.TransUnit[] = [];
    const distinctCmdCollection = pack.reduce<ICommandQueueItem[]>((arr, val) => {
      const cmd = this.queueItemByTransUnitKey[val];
      const rItem = reducer.get(cmd.hash);
      if (rItem) {
        rItem.push(cmd.transUnit);
      } else {
        reducer.set(cmd.hash, [cmd.transUnit]);
        arr.push(cmd);
      }
      transUnits.push(cmd.transUnit);
      return arr;
    }, []);
    // dequeue
    pack.forEach(p => {
      try {
        delete this.queueItemByTransUnitKey[p];
      } catch (e) {

      }
    });
    // read from file
    new Promise((resolve, reject) => {
      vscode.workspace.fs.stat(this.targetFile).then(stat => {
        vscode.workspace.fs.readFile(this.targetFile).then((data) => {
          const content = new TextDecoder('utf8').decode(data);
          const {
            transUnitByMsgId, errors
          } = Xliff.loadTransUnits(content, '');
          transUnits.forEach(t => {
            const tar = transUnitByMsgId[t.key];
            const isEmpty = t.target === null || t.target === '';
            transUnitByMsgId[t.key] = t;
            if (isEmpty) {
              // remove target
              delete transUnitByMsgId[t.key];
            }
          });
          const updatedTransUnits = Object.values(transUnitByMsgId);
          this._writeTransUnits(updatedTransUnits).then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          });
        }, (err) => {
          reject(err);
        });
      }, () => {
        this._writeTransUnits(transUnits).then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        });
      });
    }).then((val) => {
      distinctCmdCollection.forEach(cmd => {
        let transUnits = reducer.get(cmd.hash)!;
        let now = new Date();
        let result: i18nWebView.TransUnitUpdateResult = {
          time: now,
          hash: now.getTime().toString(),
          commandName: 'update-trans-unit',
          commandHash: cmd.hash,
          xliffFile: '',
          success: true,
          transUnits: transUnits,
          errors: {},
        };
        cmd.cb(result);
      });
    }).catch((err) => {
      const error = { code: 0, message: `failed to save trans unit to '${this.targetFile}', ${err}` };
      distinctCmdCollection.forEach(cmd => {
        let transUnits = reducer.get(cmd.hash)!;
        let now = new Date();
        let result: i18nWebView.TransUnitUpdateResult = {
          time: now,
          hash: now.getTime().toString(),
          success: true, // mark success and populate errors instead
          commandName: 'update-trans-unit',
          commandHash: cmd.hash,
          xliffFile: '',
          transUnits: transUnits,
          errors: transUnits.reduce((a: { [name: string]: string }, v) => {
            a[v.key] = error.message;
            return a;
          }, {}),
        };
        cmd.cb(result);
      });
    }).finally(() => {
      this.__executing__ = false;
    });
  }

  private _writeTransUnits(transUnits: i18n.TransUnit[]): Promise<boolean> {
    const content = Xliff.writeTransUnits(transUnits, this.sourceLocale, this.targetLocale, false);
    return new Promise<any>((resolve, reject) => {
      const data = new TextEncoder().encode(content);
      vscode.workspace.fs.writeFile(this.targetFile, data).then(
        () => {
          this.__last_write_time__ = new Date().getTime();
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  private _fileChangeListener() {

  }
}