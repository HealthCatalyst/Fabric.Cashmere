import { Component, Input, ViewEncapsulation } from '@angular/core';
import { anyToBoolean } from '../util';

@Component({
    selector: 'hc-chip',
    template: `<div [class]="color" [ngClass]="{'close': _action, 'chip': true}"><ng-content></ng-content></div>`,
    styleUrls: ['./chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ChipComponent {

    @Input() _action: boolean = false;
    @Input() color: 'neutral' | 'yellow' | 'green' | 'red' = 'neutral';

    constructor() {}

    @Input() get action(): boolean { return this._action; }

    set action(isAction) { this._action = anyToBoolean(isAction); }
}
