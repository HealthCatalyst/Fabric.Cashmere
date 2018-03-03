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
    _required: boolean = false;

    constructor() {}

    @Input() get valid(): boolean { return this._valid; }

    set valid(validVal) { this._valid = anyToBoolean(validVal); }

    @Input() get required(): boolean { return this._required; }

    set required(isRequired) { this._required = anyToBoolean(isRequired); }
}
