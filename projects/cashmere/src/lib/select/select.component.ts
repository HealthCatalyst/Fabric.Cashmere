import {Component, ElementRef, forwardRef, HostBinding, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {parseBooleanAttribute} from '../util';

/** Select one of many options from a dropdown */
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
    /** Optional string of text to appear before selection is made */
    @Input() placeholder: string = '';

    /** Enables or disables the component */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
        if (this._disabled) {
            this.renderer.removeClass(this.element.nativeElement, 'hc-select-disabled');
        } else {
            this.renderer.addClass(this.element.nativeElement, 'hc-select-disabled');
        }
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
    get value() {
        return this._value;
    }

    set value(val: string) {
        this._value = val;
        this.onChange(val);
    }

    private _value = '';

    @HostBinding('class.hc-select') _hostClass = true;

    private onChange: (val: any) => void = () => {};

    private onTouched: (val: any) => void = () => {};

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        if (value !== this._value) {
            this._value = value;
        }
    }
}
