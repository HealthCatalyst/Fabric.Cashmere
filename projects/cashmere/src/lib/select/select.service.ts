import {Injectable} from '@angular/core';

/** Builds a value string to help with matching objects */
export function _buildValueString(id: string | null, value: any): string {
    if (id == null) {
        return `${value}`;
    }
    if (value && typeof value === 'object') {
        value = 'Object';
    }
    return `${id}: ${value}`.slice(0, 50);
}

@Injectable()
/** @docs-private */
export class SelectService {
    _optionMap: Map<string, any> = new Map<string, any>();
    _optionIdCounter = 0; // tracks ids for select options

    _registerOption(): string {
        return (this._optionIdCounter++).toString();
    }
}
