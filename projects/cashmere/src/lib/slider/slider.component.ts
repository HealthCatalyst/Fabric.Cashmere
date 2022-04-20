import {Component, ContentChild, forwardRef, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let uniqueId = 1;

/** Cashmere wrapper for the ngx-slider component  */
@Component({
    selector: 'hc-slider',
    styleUrls: ['slider.component.scss'],
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => SliderComponent)}]
})
export class SliderComponent extends HcFormControlComponent {
    private _uniqueInputId = `hc-select-${uniqueId++}`;
    _componentId = this._uniqueInputId; // contains id for the hc-slider component

    @ContentChild(FormControl)
    _formControl: FormControl;

    @HostBinding('class.hc-slider')
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
