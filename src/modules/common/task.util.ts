
export class TaskUtils {

    static createDebounceFn(fn: Function, delay: number) {
        let timeoutID: undefined | number = undefined;
        return function (this: any) {
            window.clearTimeout(timeoutID);
            let args = arguments;
            let that = this;
            timeoutID = window.setTimeout(function () {
                fn.apply(that, args);
            }, delay);
        };
    }
}
