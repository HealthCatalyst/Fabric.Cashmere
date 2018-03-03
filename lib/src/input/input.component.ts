import { Component, Input, ViewEncapsulation } from '@angular/core';
import { anyToBoolean } from '../util';

@Component({
    selector: 'hc-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class InputComponent {

    _valid: boolean = true;

    constructor() {}

    @Input() get valid(): boolean { return this._valid; }

    set valid(validVal) { this._valid = anyToBoolean(validVal); }
}
