import {Component, forwardRef, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let uniqueMultiselectId = 1;

/** Cashmere wrapper for the ng-select component */
@Component({
    selector: 'hc-multiselect',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => MultiselectComponent)}]
})
export class MultiselectComponent extends HcFormControlComponent {
    private _uniqueInputId = `hc-multiselect-${uniqueMultiselectId++}`;
    _componentId = this._uniqueInputId; // contains id for the hc-multiselect component

    @HostBinding('class.hc-multiselect')
    _hostClass = true;

    /** Element id */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueInputId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueInputId;
    }

    /** Whether the slider is valid; triggers error messages in `hc-form-field` */
    @Input()
    get valid(): boolean {
        return !this._errorState;
    }

    set valid( val: boolean | string ) {
        this._errorState = !parseBooleanAttribute(val);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required( requiredVal: boolean | string ) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }
}
