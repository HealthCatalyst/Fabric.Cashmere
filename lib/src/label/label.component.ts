/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import {Component, Input, ViewEncapsulation, HostBinding} from '@angular/core';
import {parseBooleanAttribute} from '../util';

@Component({
    selector: 'label[hc-label]',
    template: `<div [ngClass]="{'label-required': _required}"><ng-content></ng-content></div>`,
    styleUrls: ['./label.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LabelComponent {
    @HostBinding('class.hc-label') hostClass = true;

    _required: boolean = false;

    constructor() {}

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(isRequired) {
        this._required = parseBooleanAttribute(isRequired);
    }
}
