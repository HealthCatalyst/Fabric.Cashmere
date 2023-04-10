import {Directive, ElementRef, HostBinding, HostListener, Input, Optional, Self, forwardRef, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

export function getUnsupportedHCInputType(type: string): Error {
    return new Error(`hc-input doesn't support the following type: ${type}`);
}

let uniqueId = 1;

const unsupportedTypes = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset'];

/** Directive that allows a native input to work inside a HcFormFieldComponent */
@Directive({
    selector: '[hcInput]',
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => InputDirective)}]
})
export class InputDirective extends HcFormControlComponent implements AfterViewInit, OnDestroy {
    private _focused = false;
    private _mobile = false;
    private _uniqueInputId = `hc-input-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _unsubscribe = new Subject<void>();

    _componentId = this._uniqueInputId;

    /** Input type of the element. */
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

    /** Element id. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueInputId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueInputId;
    }

    /** Sets input element as readonly. */
    @Input()
    get readonly(): boolean {
        return this._readonly;
    }

    set readonly(isReadOnly: boolean) {
        this._readonly = parseBooleanAttribute(isReadOnly);
    }

    private _readonly = false;

    /** Disables the input element. */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledInput: boolean) {
        this._isDisabled = parseBooleanAttribute(disabledInput);

        if (this._focused) {
            this._focused = false;
            // TODO: trigger state change
        }
    }

    /** Sets required attribute. */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredInput: boolean) {
        this._isRequired = parseBooleanAttribute(requiredInput);
    }

    /** Fires when the input either gets focus or loses focus. */
    @Output() focusChanged = new EventEmitter<boolean>();

    /** Fires on either a `change` or `input` event type from the input. */
    @Output() inputEvent = new EventEmitter<Event>();

    @HostBinding('class.hc-input')
    _hostHcInputClass = true;

    @HostBinding('attr.id')
    get _hostId(): string {
        return this._componentId || this._uniqueInputId;
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
        return this._isRequired;
    }

    @HostListener('blur')
    _onBlur(): void {
        if ( this._ngControl && this._ngControl.control) {
            this._ngControl.control.markAsTouched();
        }
        this._changeFocus(false);
        this._updateErrorState();
    }

    @HostListener('focus')
    _onFocus(): void {
        this._changeFocus(true);
    }

    /** Sets value of the input element */
    @Input()
    get value(): string {
        return this._elementRef.nativeElement.value;
    }

    set value(value: string) {
        if (value !== this.value) {
            this._elementRef.nativeElement.value = value;
        }
    }

    @HostListener('input', ['$event'])
    _inputEvent(event: Event): void {
        this.inputEvent.emit(event);
    }

    @HostListener('change', ['$event'])
    _changeEvent(event: Event): void {
        this.inputEvent.emit(event);
    }

    /** Sets whether the input should be sized for small screens (if true, overrides the `tight` param on FormField) */
    @Input()
    get mobile(): boolean {
        return this._mobile;
    }

    set mobile(value: boolean) {
        if ( value !== this._mobile ) {
            this._mobile = value;
            this.mobileChange.emit( this._mobile );
        }
    }

    /** Output for two-way binding on the `mobile` param. Emits when the property is updated */
    @Output()
    mobileChange = new EventEmitter<boolean>();

    ngAfterViewInit(): void {
        if ( this._ngControl && this._ngControl.statusChanges ) {
            this._ngControl.statusChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => this._updateErrorState());
        }
        if ( this._form ) {
            this._form.ngSubmit.pipe(takeUntil(this._unsubscribe)).subscribe(() => this._updateErrorState());
        }
    }

    constructor(
        private _elementRef: ElementRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
    }

    /** Sets the focus on the input element */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    private _changeFocus(focused: boolean) {
        if (this._focused !== focused && !this.readonly) {
            this._focused = focused;
            this.focusChanged.emit(focused);
        }
    }

    private _isTextArea(): boolean {
        return this._elementRef.nativeElement.nodeName.toLowerCase() !== 'textarea';
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
