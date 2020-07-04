import * as vscode from 'vscode';
import * as path from 'path';
import { ObjectUtils } from '../common/object.util';
import { CONST_EXTENSION_SETTING_FILE } from '../../constants';

const G_DefaultSetting: INgI18nExtSetting = {
    tm: { // TODO: translation memory feature is not supported yet
        enabled: false,
        mode: 'git',
        uri: '.ngI18nExt/ext.xtm'
    },
    locales: ['en-US'],
    editor: {
        translationSaveOn: 'blur',
        messageLocations: [
            'src/locale/messages.xlf'
        ],
    }
};

type ExtChangedFunc = (cur: INgI18nExtSetting, old: INgI18nExtSetting) => void;

export interface IExtChangedEventSubscription {
    unsubscribe(): void;
}

class ExtChangedEventSubscription implements IExtChangedEventSubscription {
    constructor(
        public readonly counter: number,
        private readonly cancelFn: (counter: number) => void
    ) { }
    unsubscribe() {
        this.cancelFn(this.counter);
    }
}

export class ExtensionSettingManager implements vscode.Disposable {
    private static _g_listener_counter: number = 1024; // counter starting from 1024 (no reason just I like to do so)

    private _handling_event_counter: number = 0;
    private _vs_subscriptions: vscode.Disposable[] = [];
    private _event_subscribers: {
        [counter: string]: {
            changeCb: ExtChangedFunc;
            disposeCb: () => void | null;
        }
    } = {};

    private _setting: INgI18nExtSetting;

    static create(context: vscode.ExtensionContext): Thenable<ExtensionSettingManager> {
        return new Promise<ExtensionSettingManager>((resolve, reject) => {
            const settingUri = vscode.Uri.parse(path.resolve(vscode.workspace.workspaceFolders![0].uri.fsPath, CONST_EXTENSION_SETTING_FILE));
            vscode.workspace.fs.readFile(settingUri).then((content) => {
                try {
                    const jsonStr = new TextDecoder("utf-8").decode(content);
                    const setting: INgI18nExtSetting = JSON.parse(jsonStr);
                    resolve(new ExtensionSettingManager(context, setting));
                } catch (e) {
                    resolve(new ExtensionSettingManager(context, G_DefaultSetting));
                }
            }, (err) => {
                resolve(new ExtensionSettingManager(context, G_DefaultSetting));
            });
        });
    }


    get setting(): INgI18nExtSetting {
        return ObjectUtils.clone(this._setting);
    }

    private constructor(context: vscode.ExtensionContext, setting: INgI18nExtSetting) {
        this._setting = ObjectUtils.clone(setting);
        this.init();
        context.subscriptions.push(this);
    }

    private init() {
        const watcher = vscode.workspace.createFileSystemWatcher(
            new vscode.RelativePattern(vscode.workspace.workspaceFolders![0], CONST_EXTENSION_SETTING_FILE), true, false, true);
        watcher.onDidChange(this.onExtentionSettingChange.bind(this), this._vs_subscriptions);
    }

    update(setting: INgI18nExtSetting) {
        const old = this._setting;
        const cur = ObjectUtils.clone(setting);
        const diffs = ObjectUtils.diff(cur, old);
        if (diffs.length > 0) {
            this._setting = cur;
            console.log(`[ExtensionSettingManager] setting updated.`, { cur, old });
            this.sendChangeEventToSubscribers(cur, old);
        }
    }

    onSettingDidChange(onChange: ExtChangedFunc, onDispose: () => void | null): IExtChangedEventSubscription {
        const counter = ExtensionSettingManager._g_listener_counter++;
        this._event_subscribers[counter.toString()] = { changeCb: onChange, disposeCb: onDispose };
        return new ExtChangedEventSubscription(counter, (c: number) => {
            this.removeSubscriber(c);
        });
    }

    private removeSubscriber(counter: number) {
        const k = counter.toString();
        const s = this._event_subscribers[k];
        if (s) {
            delete this._event_subscribers[k];
        }
    }

    private onExtentionSettingChange(e: vscode.Uri) {
        const curHandleCounter = this.nextHandleCount();
        vscode.workspace.fs.readFile(e).then(
            (content) => {
                if (curHandleCounter !== this._handling_event_counter) {
                    // skip due to new changing event triggered.
                    return;
                }
                try {
                    const jsonStr = new TextDecoder("utf-8").decode(content);
                    const cur: INgI18nExtSetting = JSON.parse(jsonStr);
                    this.update(cur);
                } catch (e) {
                    console.error(`[onExtentionSettingChange] failed to parse setting data: ${e}`, e, content);
                }
            },
            (err) => {
                console.error(`[onExtentionSettingChange] failed to read ${e.fsPath}: err`);
            }
        );
    }

    private sendChangeEventToSubscribers(cur: INgI18nExtSetting, old: INgI18nExtSetting) {
        Object.values(this._event_subscribers).forEach(s => {
            try {
                s.changeCb(cur, old);
            } catch (e) {
                // ignore error.
            }
        });
    }

    private nextHandleCount() {
        return (this._handling_event_counter++) + 1;
    }

    dispose() {
        this._vs_subscriptions.forEach(d => {
            try { d.dispose(); } catch (e) { }
        });
        Object.values(this._event_subscribers).forEach(s => {
            try { s.disposeCb(); } catch (e) { }
        });
    }
}