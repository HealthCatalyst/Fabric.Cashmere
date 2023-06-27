export function writeToStorage(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function readFromStorage(key: string): any | null {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : null;
}
