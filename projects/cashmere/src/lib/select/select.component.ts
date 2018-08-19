import {Component, forwardRef, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {parseBooleanAttribute} from '../util';

/** Select one of many options from a dropdown */
@Component({
    selector: 'hc-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
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
    /** Optional string of text to appear before selection is made */
    @Input() placeholder: string;

    /** Enables or disables the component */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    private _disabled = false;

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(isRequired) {
        this._required = parseBooleanAttribute(isRequired);
    }

    private _required = false;

    /** Get or set the value of the select component */
    @Input()
    get value() {
        return this._value;
    }

    set value(val: string) {
        if (val !== this._value) {
            this._value = val;
            this.onChange(val);
        }
    }

    private _value: string = '';

    @HostBinding('class.hc-select') _hostClass = true;

    @HostBinding('class.hc-select-disabled')
    get _disabledClass() {
        return this.disabled;
    }

    private onChange: (val: any) => void = () => {};

    private onTouched: (val: any) => void = () => {};

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        this._value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
