import { InjectionToken } from '@angular/core';
import { SelectionModelFactory } from './pane/selection-model';

/** @docs-private */
export class PickOption {
    [name: string]: any;
    /** zero-based position in the list */
    index?: number;
    /** used as the id for the DOM element representing this option */
    htmlId?: string;
    /** true if the option is highlighted in its pane */
    selected?: boolean;
    /** true if the option should not be available for interaction */
    disabled?: boolean;
    /** true if the option currently has focus in the list */
    marked?: boolean;
    /** the display name for the option */
    label?: string;
    /** the option given to the form or NgModel for this option */
    value?: string | Object;
    /** reference to this option's parent option */
    parent?: PickOption;

    // for HcOption groups only
    /** identifier for the group. typically a string, but can be an HcOption if items provided to the
     * component were grouped before being passed in */
    groupKey?: string | PickOption;
    /** collection of nested HcOptions */
    children?: PickOption[];
    /** true if this group should be collapsed in the UI*/
    isClosed = false;

    get isChild(): boolean { return !!this.parent; }
    get isParent(): boolean { return !!this.children; }

    constructor(config: IPickOption) {
        Object.assign(this, config);
    }

    toggleOpenState(event: MouseEvent) {
        event.stopPropagation();
        this.isClosed = !this.isClosed;
    }
}

export type IPickOption = Partial<PickOption>;

// todo - use cashmere keycodes
export enum KeyCode {
    Tab = 9,
    Enter = 13,
    Esc = 27,
    Space = 32,
    ArrowUp = 38,
    ArrowDown = 40,
    Backspace = 8
}

export const SELECTION_MODEL_FACTORY = new InjectionToken<SelectionModelFactory>('ng-select-selection-model');
export type AddCustomItemFn = ((term: string) => any | Promise<any>);
export type CompareWithFn = (a: any, b: any) => boolean;
export type GroupValueFn = (key: string | object, children: any[]) => string | object;
export type SortFn = (a: PickOption, b: PickOption) => number;
export type SearchFn = (term: string, item: any) => boolean;
