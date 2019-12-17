import {
    Component,
    forwardRef,
    HostBinding,
    Input,
    ViewEncapsulation,
    ElementRef,
    Optional,
    DoCheck,
    Self,
    Output,
    EventEmitter
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let uniqueId = 1;

export class SelectChangeEvent {
    constructor(public source: SelectComponent, public value: string) {}
}

/** Select one of many options from a dropdown */
@Component({
    selector: 'hc-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => SelectComponent)}]
})
export class SelectComponent extends HcFormControlComponent implements ControlValueAccessor, DoCheck {
    private _uniqueInputId = `hc-select-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;

    _componentId = this._uniqueInputId;

    /** Optional string of text to appear before selection is made */
    @Input()
    placeholder: string;

    /** Enables or disables the component */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledVal) {
        this._isDisabled = parseBooleanAttribute(disabledVal);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Element id. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueInputId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueInputId;
    }

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

    @Output()
    readonly focus: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    readonly blur: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted whenever the state changes */
    @Output()
    change = new EventEmitter<SelectChangeEvent>();

    private _value: string = '';

    @HostBinding('class.hc-select')
    _hostClass = true;

    @HostBinding('class.hc-select-disabled')
    get _disabledClass() {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
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
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
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

    _change(event: Event, value: string) {
        event.stopPropagation();
        this.onChange(value);
        this.value = value;
        this._emitChangeEvent();
    }

    private _emitChangeEvent() {
        this.change.emit(new SelectChangeEvent(this, this.value));
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
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
}
