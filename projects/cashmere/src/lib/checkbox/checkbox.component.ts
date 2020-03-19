/* tslint:disable:no-use-before-declare */

import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    Self,
    Optional,
    DoCheck
} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let nextCheckboxId = 1;

export class CheckboxChangeEvent {
    constructor(public source: CheckboxComponent, public checked: boolean) {}
}

@Component({
    selector: 'hc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => CheckboxComponent)}],
    exportAs: 'hcCheckbox'
})
export class CheckboxComponent extends HcFormControlComponent implements ControlValueAccessor, DoCheck {
    private _uniqueId = `hc-checkbox-${nextCheckboxId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _checked: boolean = false;
    private _tabIndex: number;
    private _tight: boolean = false;

    _componentId = this._uniqueId;

    /** Value attribute of the native checkbox */
    @Input()
    value: string;

    /** Whether the checkbox is indeterminate. It can represent a checkbox with three states. */
    @Input()
    indeterminate: boolean;

    /** Unique id for the checkbox element. If none is supplied, one will be auto-generated. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueId;
    }

    /** If true, condense the default margin and reduce the font size. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
    }

    /** Sets the position of the checkbox relative to its associated label. *Defaults to `center`.*  */
    @Input()
    align: 'center' | 'top' | 'bottom' = 'center';

    /** Sets unique name used in a form */
    @Input()
    name: string | null = null;

    /** Event emitted whenever the state changes */
    @Output()
    change = new EventEmitter<CheckboxChangeEvent>();

    @ViewChild('checkboxInput', {static: false})
    _checkboxInput: ElementRef;

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this.id;
    }

    @HostBinding('class.hc-checkbox-checked')
    get _getCheckboxCheckedClass(): boolean {
        return this.checked;
    }

    @HostBinding('class.hc-checkbox-disabled')
    get _getCheckboxDisabledClass(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    @HostBinding('class.hc-checkbox-indeterminate')
    get _getCheckboxIndeterminateClass(): boolean {
        return this.indeterminate;
    }

    /** Whether the checkbox is required. */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Whether the checkbox is disabled. */
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

    /** Whether the checkbox is checked. */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        if (this._checked === checked) {
            return;
        }
        this._checked = checked;
    }

    /** TabIndex attribute of native checkbox */
    get tabIndex(): number {
        return this._isDisabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    get _inputId() {
        return `${this.id || this._uniqueId}-input`;
    }

    private _onChangeFunc: (value: any) => void = () => {};

    private _onTouchFunc: () => any = () => {};

    constructor(
        @Attribute('tabindex') tabindex: string,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this.tabIndex = parseInt(tabindex, 10) || 0;

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this._onChangeFunc = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouchFunc = fn;
    }

    setDisabledState(disabledVal: boolean): void {
        this.disabled = disabledVal;
        this._renderer.setProperty(this._checkboxInput.nativeElement, 'disabled', disabledVal);
    }

    /** Toggles the current checked state of the checkbox */
    toggle() {
        this.checked = !this.checked;
    }

    _clickEvent(event: Event) {
        event.stopPropagation(); // prevent native click event from being dispatched

        if (!this.disabled) {
            this.toggle();
            this._emitChangeEvent();
        }
    }

    _stopChangeEvent(event: Event) {
        event.stopPropagation(); // prevent native change event from emitting its own object through output 'change'
    }

    private _emitChangeEvent(): void {
        this._onChangeFunc(this.checked);
        this.change.emit(new CheckboxChangeEvent(this, this.checked));
    }

    _onBlur() {
        this._onTouchFunc();
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
