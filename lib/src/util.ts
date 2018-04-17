export function parseBooleanAttribute(value: any): boolean {
    return value != null && value.toString() !== 'false'
}
