import {Component, Input, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

const supportedColors = ['neutral', 'yellow', 'green', 'red'];

export function validateColorInput(inputStr: string) {
    if (supportedColors.indexOf(inputStr) < 0) {
        throw Error('Unsupported chip color value: ' + inputStr);
    }
}

/** Chips represent complex entities in small blocks, such as filters, contacts, or system information */
@Component({
    selector: 'hc-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChipComponent {
    private _action: boolean = false;
    private _color: string = 'neutral';

    /** Sets chip color to one of: `neutral`, `yellow`, `green`, or `red` (default=`neutral`) */
    @Input()
    get color(): string {
        return this._color;
    }

    set color(colorType: string) {
        validateColorInput(colorType);
        this._color = colorType;
    }

    constructor() {}

    /** If true, displays a delete button and pointer cursor on the chip */
    @Input()
    get action(): boolean {
        return this._action;
    }

    set action(isAction) {
        this._action = parseBooleanAttribute(isAction);
    }
}
