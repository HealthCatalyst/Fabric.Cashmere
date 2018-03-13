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
    _highlight: boolean = false;
    _required: boolean = false;
    _value: string = '';

    constructor() { }

    @Input() get highlight(): boolean { return this._highlight; }

    @Input() get disabled(): boolean { return this._disabled; }

    @Input() get required(): boolean { return this._required; }

    set required(isRequired) { this._required = anyToBoolean(isRequired); }

    set disabled(isDisabled) { this._disabled = anyToBoolean(isDisabled); }

    set highlight(highlightVal) { this._highlight = anyToBoolean(highlightVal); }

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
