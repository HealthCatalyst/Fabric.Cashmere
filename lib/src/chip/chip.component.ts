import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { anyToBoolean } from '../util';

@Component({
    selector: 'hc-chip',
    template: `<div [ngClass]="chipType"><ng-content></ng-content></div>`,
    styleUrls: ['./chip.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ChipComponent implements OnInit {

    _action: boolean = false;
    @Input() color: string = 'neutral';
    chipType: string = 'chip';

    constructor() {}

    ngOnInit() {
        this.chipType += ' ' + this.color;
    }

    @Input()
    get action(): boolean {
        return this._action;
    }

    set action(isAction) {
        this._action = anyToBoolean(isAction);
        if ( this._action ) {
            this.chipType = 'chip close';
        } else {
            this.chipType = 'chip';
        }

        this.chipType += ' ' + this.color;
    }
}
