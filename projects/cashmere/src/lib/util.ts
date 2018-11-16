export function parseBooleanAttribute(value: boolean | string): boolean {
    if (typeof value === 'boolean') {
        return value;
    }
    if (value.toLowerCase() === 'false') {
        return false;
    }
    if (value.toLowerCase() === 'true' || value === '') {
        return true;
    }
    throw Error(String(value) + ' is not a boolean value');
}
