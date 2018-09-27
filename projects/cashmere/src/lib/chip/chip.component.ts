import {Component, Input, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

/** Chips represent complex entities in small blocks, such as filters, contacts, or system information */
@Component({
    selector: 'hc-chip',
    template: `<div [class]="color" [ngClass]="{'close': action, 'chip': true}"><ng-content></ng-content></div>`,
    styleUrls: ['./chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChipComponent {
    private _action: boolean = false;
    /** Sets chip color to one of: 'neutral', 'yellow', 'green', or 'red' (default='neutral') */
    @Input() color: 'neutral' | 'yellow' | 'green' | 'red' = 'neutral';

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
