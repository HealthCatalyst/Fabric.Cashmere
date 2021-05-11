import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {parseBooleanAttribute} from '../util';

const supportedColors = ['neutral', 'yellow', 'green', 'red', 'blue'];

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
    private _hasCloseButton = false;
    private _color = 'neutral';
    _tight = false;

    /** Emitted when the 'X' close button is clicked. `(click)` may be used for clicks on the entire chip */
    @Output()
    closeClick = new EventEmitter<MouseEvent>();

    /** Sets chip color to one of: `neutral`, `yellow`, `green`, `red`, or `blue` (default=`neutral`) */
    @Input()
    get color(): string {
        return this._color;
    }

    set color(colorType: string) {
        validateColorInput(colorType);
        this._color = colorType;
    }

    constructor() {}

    /** If true, displays an X button on the right side of the chip which emits a `closeClick` event */
    @Input()
    get hasCloseButton(): boolean {
        return this._hasCloseButton;
    }

    set hasCloseButton(hasButton) {
        this._hasCloseButton = parseBooleanAttribute(hasButton);
    }

    /** If true, removes the margins & padding from the chip; defaults to `false` */
    @Input()
    get tight(): boolean {
        return this._tight;
    }

    set tight(val) {
        this._tight = parseBooleanAttribute(val);
    }

    /** Allows you to customize the width of a chip (ie. `100%`, `250px`); defaults to `auto` */
    @Input()
    width = 'auto';

    /** Called on a click of the X close button */
    _closeClick(e: MouseEvent) {
        this.closeClick.emit(e);
    }
}
