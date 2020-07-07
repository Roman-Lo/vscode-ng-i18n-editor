import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import { Xtm } from "./xtm";
import { TaskUtils } from "../common/task.util";
import { ObjectUtils } from "../common/object.util";
import { ExtensionSettingManager, IExtChangedEventSubscription } from "../setting/ext-setting-manager";

interface IMemoryCellCacheStruct {
  srcIdfr: string;
  musByLocale: { [locale: string]: xtm.IMemoryUnit[] };
}

interface IMemoryUnitUpdateCommand {
  sourceIdentifier: string;
  targetLocale: string;
  transUnit: i18n.TransUnit;
  timestamp: number;
  _queue_idx_?: number;
}

export class TranslationMemoryManager implements vscode.Disposable {
  private static _g_tm_update_queue_idx = 2048;
  private static _g_instance_dict_: { [key: string]: { path: string, srcLocale: string, inst: TranslationMemoryManager } } = {};

  static getInstance(file: string, sourceLocale: string): TranslationMemoryManager {
    const instKey = TranslationMemoryManager.getInstanceKey(file, sourceLocale);
    let tar = TranslationMemoryManager._g_instance_dict_[instKey];
    if (!tar) {
      const inst = new TranslationMemoryManager(file, sourceLocale);
      TranslationMemoryManager._g_instance_dict_[instKey] = tar = {
        path: file,
        srcLocale: sourceLocale,
        inst: inst
      };
    }
    return tar.inst;
  }

  static getInstanceKey(file: string, sourceLocale: string) {
    return `${sourceLocale}_${file}`;
  }

  private readonly _command_by_key_: { [key: string]: IMemoryUnitUpdateCommand } = {};
  private readonly _command_key_queue_: string[] = [];
  private _setting: ITranslationMemorySetting = { enabled: false, mode: 'git', uri: '.ngI18nExt/ext.xtm' };

  private __interval_pin__: any | null = null;
  private _running: boolean = false;
  private _executing: boolean = false;

  private readonly xtmFileListener: (cur: fs.Stats, pre: fs.Stats) => void;
  private _last_mtime_: number = 0;

  private _initialized = false;

  private _memoryItemByIdfr: { [key: string]: IMemoryCellCacheStruct } = {};

  private _settingChangeSubscription!: IExtChangedEventSubscription;

  get enabled(): boolean {
    return this._setting.enabled;
  }

  constructor(
    private readonly xtmFileLocation: string,
    private readonly sourceLocale: string,
  ) {
    this.xtmFileListener = TaskUtils.createDebounceFn(this._onXtmFileChanged.bind(this), 500);
    this.init();
  }

  private init() {
    const settingManager = ExtensionSettingManager.getInstance();
    this._setting = settingManager.setting.tm || this._setting;
    this.initXtmFile();
    this._settingChangeSubscription = settingManager.onSettingDidChange((cur) => {
      const curSetting = cur.tm;
      const oldSetting = this._setting;
      const diffs = ObjectUtils.diff(curSetting, oldSetting);
      if (diffs.length > 0) {
        let curEnabled = curSetting.enabled;
        let oldEnabled = oldSetting.enabled;
        this._setting = ObjectUtils.clone(curSetting);
        if (curEnabled !== oldEnabled) {
          if (oldEnabled) {
            this.stop();
            this.flushCmdQueue();
          } else {
            this.restart();
          }
        }
      }
    });
    this._initialized = true;
  }

  private initXtmFile() {
    let isNew = false;
    if (!fs.existsSync(this.xtmFileLocation)) {
      isNew = true;
      const content = Xtm.writeTranslationMemories(this.sourceLocale, []);
      const parts = this.xtmFileLocation.split(path.sep);
      parts.splice(parts.length - 1);
      const dir = parts.join(path.sep);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(this.xtmFileLocation, content, { encoding: 'utf8' });
    }
    this._last_mtime_ = fs.statSync(this.xtmFileLocation).mtime.getTime();
    fs.watchFile(this.xtmFileLocation, this.xtmFileListener);
    if (!isNew) {
      this.initCacheFromFile();
    }
    if (this.enabled) {
      this.restart();
    }
  }

  private initCacheFromFile() {
    const xtmContent = fs.readFileSync(this.xtmFileLocation, { encoding: 'utf8' });
    const { memories } = Xtm.loadTranslationMemories(xtmContent, '');
    const cached: { [key: string]: IMemoryCellCacheStruct } = memories.reduce((dict: { [key: string]: IMemoryCellCacheStruct }, val) => {
      const { sourceIdentifier, localeTargetGroups } = val;
      let tar = dict[sourceIdentifier];
      if (!tar) {
        dict[sourceIdentifier] = tar = {
          srcIdfr: sourceIdentifier,
          musByLocale: {}
        };
      }
      localeTargetGroups.forEach(g => {
        const { locale, memoryUnits } = g;
        let ltar = tar.musByLocale[locale];
        if (!ltar) {
          tar.musByLocale[locale] = ltar = [];
        }
        ltar.push(...memoryUnits.map(u => ObjectUtils.clone(u)));
      });
      return dict;
    }, {});
    this._memoryItemByIdfr = cached;
  }

  private restart() {
    this.stop();
    this.start();
  }

  private start() {
    this.__interval_pin__ = setInterval(() => {
      if (!this._executing) {
        this.flushCmdQueue();
      }
    }, 1000);
    this._running = true;
  }

  private stop() {
    if (this.__interval_pin__) {
      clearInterval(this.__interval_pin__);
      this.__interval_pin__ = null;
      this._running = false;
    }
  }

  private _onXtmFileChanged(cur: fs.Stats, pre: fs.Stats) {
    if (cur.mtime.getTime() > this._last_mtime_) {
      // should reload cache
      this.initCacheFromFile();
    }
  }

  private _syncCacheToTMFile(): Promise<boolean> {
    // write to file
    const memories: xtm.IMemoryCell[] = Object.keys(this._memoryItemByIdfr).map(k => {
      const cacheItem = this._memoryItemByIdfr[k];
      const cell: xtm.IMemoryCell = {
        sourceIdentifier: cacheItem.srcIdfr,
        localeTargetGroups: []
      };
      const localeTargetGroups: xtm.ILocaleTarget[] = Object.keys(cacheItem.musByLocale).map(locale => {
        const group: xtm.ILocaleTarget = { locale, memoryUnits: cacheItem.musByLocale[locale] };
        return group;
      });
      cell.localeTargetGroups = localeTargetGroups;
      return cell;
    });
    const fileContent = Xtm.writeTranslationMemories(this.sourceLocale, memories);
    return new Promise<boolean>((resolve, reject) => {
      fs.writeFile(this.xtmFileLocation, fileContent, { encoding: 'utf8' }, (err) => {
        if (err) {
          reject(`failed to write file content (${this.xtmFileLocation}): ${err}`);
        } else {
          this._last_mtime_ = new Date().getTime();
          resolve(true);
        }
      });
    });
  }

  private buildQueueKey(cmd: IMemoryUnitUpdateCommand): string {
    return `@${cmd.targetLocale}->${cmd.sourceIdentifier}`;
  }

  private nextQueueIdx() {
    return TranslationMemoryManager._g_tm_update_queue_idx++;
  }

  private flushCmdQueue() {
    this._executing = true;
    try {
      if (this._command_key_queue_.length === 0) {
        this._executing = false;
        return;
      }
      const keys: string[] = [...this._command_key_queue_]; //this._command_key_queue_.splice(0, len);
      let needWriteFile = false;
      keys.forEach(k => {
        const cmd = this._command_by_key_[k];
        if (cmd) {
          // update 
          let cacheItem = this._memoryItemByIdfr[cmd.sourceIdentifier];
          if (!cacheItem) {
            this._memoryItemByIdfr[cmd.sourceIdentifier] = cacheItem = {
              srcIdfr: cmd.sourceIdentifier,
              musByLocale: {}
            };
          }
          let langCacheItem = cacheItem.musByLocale[cmd.targetLocale];
          if (!langCacheItem) {
            cacheItem.musByLocale[cmd.targetLocale] = langCacheItem = [];
          }
          const { transUnit } = cmd;
          let curMu: xtm.IMemoryUnit = {
            target: transUnit.target!,
            identifier: transUnit.target_identifier!,
            state: transUnit.state!,
            key: transUnit.key,
            description: transUnit.description,
            meaning: transUnit.meaning,
          };
          let tarMuIdx = langCacheItem.findIndex(x => x.key === cmd.transUnit.key);
          let needPush = false;
          if (tarMuIdx >= 0) {
            const tarMu = langCacheItem[tarMuIdx];
            const diffs = ObjectUtils.diff(curMu, tarMu);
            if (diffs.length > 0) {
              langCacheItem.splice(tarMuIdx, 1);
              needPush = true;
            }
          } else {
            needPush = true;
          }
          if (needPush) {
            langCacheItem.push(curMu);
            needWriteFile = true;
          }
        }
      });
      if (needWriteFile) {
        this._syncCacheToTMFile()
          .then(ok => {

          })
          .finally(() => {
            this._executing = false;
          });
      } else {
        this._executing = false;
      }
    } catch (e) {
      this._executing = false;
    }
  }

  searchTM(sourceIdentifier: string, targetLocale: string, key: string | null): xtm.IMemoryUnit[] {
    let tar = this._memoryItemByIdfr[sourceIdentifier];
    if (tar) {
      let ltar = tar.musByLocale[targetLocale];
      if (ltar) {
        let result = ltar;
        if (key) {
          result = result.filter(x => x.key === key);
        }
        return ObjectUtils.clone(result);
      }
    }
    return [];
  }

  update(cmd: IMemoryUnitUpdateCommand) {
    if (!this.enabled) {
      return;
    }
    if (!cmd.transUnit.target) {
      // not saving empty item to tm
      return;
    }
    const cmdIdxed = ObjectUtils.clone(cmd);
    cmdIdxed._queue_idx_ = this.nextQueueIdx();
    // check 
    const qKey = this.buildQueueKey(cmdIdxed);
    if (this._command_by_key_[qKey]) {
      const preCmd = this._command_by_key_[qKey];
      const idx = this._command_key_queue_.indexOf(qKey);
      if (idx >= 0 && preCmd.timestamp <= cmd.timestamp) {
        // omit previous cmd
        this._command_key_queue_.splice(idx, 1);
      }
    }
    this._command_by_key_[qKey] = cmdIdxed;
    this._command_key_queue_.push(qKey);
  }

  dispose() {
    try {
      if (this._settingChangeSubscription) {
        this._settingChangeSubscription.unsubscribe();
      }
    } catch (e) { }
    try {
      fs.unwatchFile(this.xtmFileLocation, this.xtmFileListener);
    } catch (e) { }
    try {
      this.flushCmdQueue();
    } catch (e) { }
    if (this.__interval_pin__) {
      try {
        clearInterval(this.__interval_pin__);
        this.__interval_pin__ = null;
      } catch (e) { }
    }
  }

}