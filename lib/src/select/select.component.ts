import { Component, Input, OnInit, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { anyToBoolean } from '../util';

@Component({
    selector: 'hc-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})

export class SelectComponent implements ControlValueAccessor {

    @Input() placeholder: string = '';

    _disabled: boolean = false;
    _valid: boolean = true;
    _value: string = '';

    constructor() { }

    @Input() get valid(): boolean { return this._valid; }

    @Input() get disabled(): boolean { return this._disabled; }

    set disabled(isDisabled) { this._disabled = anyToBoolean(isDisabled); }

    set valid(validVal) { this._valid = anyToBoolean(validVal); }

    onChange: any = () => { };

    onTouched: any = () => { };

    get value() { return this._value; }

    set value(val: string) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    registerOnChange(fn: any) { this.onChange = fn; }

    registerOnTouched(fn: any) { this.onTouched = fn; }

    writeValue(value: string) {
        if (value) {
            this._value = value;
        }
    }

}
