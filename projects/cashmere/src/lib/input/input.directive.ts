import {Directive, DoCheck, ElementRef, HostBinding, HostListener, Input, Optional, Self} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';

export function getUnsupportedHCInputType(type: string): Error {
    return new Error(`hc-input doesn't support the following type: ${type}`);
}

let uniqueId = 1;

const unsupportedTypes = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset'];

@Directive({
    selector: '[hcInput]'
})
export class InputDirective implements DoCheck {
    private _focused = false;
    private _uniqueInputId = `hc-input-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;

    errorState: boolean = false;

    @Input() placeholder: string;

    @Input()
    get type(): string {
        return this._type;
    }

    set type(type: string) {
        if (unsupportedTypes.indexOf(type) > -1) {
            throw getUnsupportedHCInputType(type);
        }
        this._type = type;

        // textArea doesn't have type property
        if (!this._isTextArea()) {
            this._elementRef.nativeElement.type = this.type;
        }
    }

    private _type = 'input';

    @Input()
    get id(): string {
        return this._id || this._uniqueInputId;
    }

    set id(id: string) {
        this._id = id;
    }

    private _id: string;

    @Input()
    get readonly(): boolean {
        return this._readonly;
    }

    set readonly(isReadOnly) {
        this._readonly = parseBooleanAttribute(isReadOnly);
    }

    private _readonly = false;

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);

        if (this._focused) {
            this._focused = false;
            // TODO: trigger state change
        }
    }

    private _disabled = false;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    private _required = false;

    @HostBinding('class.hc-input') hostHcInputClass = true;

    @HostBinding('attr.id')
    get _hostId(): string {
        return this.id;
    }

    @HostBinding('readonly')
    get _hostReadOnly(): boolean {
        return this.readonly;
    }

    @HostBinding('disabled')
    get _hostDisabled(): boolean {
        return this.disabled;
    }

    @HostBinding('required')
    get _hostRequired(): boolean {
        return this.required;
    }

    @HostListener('blur')
    _onBlur() {
        this._changeFocus(false);
    }

    @HostListener('focus')
    _onFocus() {
        this._changeFocus(true);
    }

    @Input()
    get value(): string {
        return this._elementRef.nativeElement.value;
    }

    set value(value: string) {
        if (value !== this.value) {
            this._elementRef.nativeElement.value = value;
        }
    }

    @HostListener('input')
    _inputEvent() {
        // causes angular to run change detection on input event
    }

    constructor(
        private _elementRef: ElementRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public ngControl: NgControl
    ) {
        this._form = _parentForm || _parentFormGroup;
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    private _changeFocus(focused: boolean) {
        if (this._focused !== focused && !this.readonly) {
            this._focused = focused;
            // TODO: trigger state change
        }
    }

    private _isTextArea(): boolean {
        return this._elementRef.nativeElement.nodeName.toLowerCase() !== 'textarea';
    }

    private updateErrorState() {
        const oldState = this.errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(this.ngControl && this.ngControl.invalid && (this.ngControl.touched || (this._form && this._form.submitted)));

        if (oldState !== newState) {
            this.errorState = newState;
        }
    }
}
