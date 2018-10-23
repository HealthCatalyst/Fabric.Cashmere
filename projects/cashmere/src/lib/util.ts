export function parseBooleanAttribute(value: any): boolean {
    if (typeof value === 'boolean') {
        return value;
    } else if (value.toLowerCase() === 'false') {
        return false;
    } else if (value.toLowerCase() === 'true' || value === '') {
        return true;
    } else {
        throw Error(String(value) + ' is not a boolean value');
    }
}
