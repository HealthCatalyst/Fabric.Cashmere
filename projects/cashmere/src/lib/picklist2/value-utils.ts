const helperEl = document.createElement('p'); // Throw-away element, or keep to reuse, but not in DOM

export function escapeHTML(string: string) {
    helperEl.innerText = string; // Setting inner text causes escaping
    return helperEl.innerHTML;
}

export function isDefined(value: any) {
    return value !== undefined && value !== null;
}

export function isObject(value: any) {
    return typeof value === 'object' && isDefined(value);
}

export function isPromise(value: any) {
    return value instanceof Promise;
}

export function isFunction(value: any) {
    return value instanceof Function;
}

export function newId() {
    // First character is an 'a', it's good practice for unique id to begin with a letter
    return 'axxxxxxxxxxx'.replace(/[x]/g, function (_) {
        // tslint:disable-next-line:no-bitwise
        const val = Math.random() * 16 | 0;
        return val.toString(16);
    });
}
