/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/directive-selector */
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ElementRef,
    ContentChild,
    OnDestroy
} from '@angular/core';
import type {QueryList} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import { InputDirective } from '../input';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

let nextUniqueId = 0;

/** Groups single radio buttons together into a set for which only one can be selected */
@Directive({
    selector: 'hc-radio-group',
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => RadioGroupDirective), multi: true}],
    exportAs: 'hcRadioGroup'
})
export class RadioGroupDirective extends HcFormControlComponent implements ControlValueAccessor, AfterContentInit {
    @HostBinding('class.hc-radio-group-vertical')
    _verticalClass = true;
    @HostBinding('class.hc-radio-group-horizontal')
    _horizontalClass = false;

    /** Event emitted when the value of a radio button changes inside the group. */
    @Output()
    change: EventEmitter<RadioButtonChangeEvent> = new EventEmitter<RadioButtonChangeEvent>();
    /** A list of all the radio buttons included in the group */
    @ContentChildren(
        forwardRef(() => RadioButtonComponent),
        {descendants: true}
    )
    radios: QueryList<RadioButtonComponent>;
    private _value: any = null;
    private _uniqueName = `hc-radio-group-${nextUniqueId++}`;
    private _name = this._uniqueName;
    private _inline = false;
    private _align: 'center' | 'top' | 'bottom' = 'center';
    private _initialized = false; // if value of radio group has been set to initial value
    private _selected: RadioButtonComponent | null = null; // the currently selected radio
    private _form: NgForm | FormGroupDirective | null;

    _componentId = this._name;

    /** Name of radio group. Auto-generated name will be used if no name is set */
    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value ? value : this._uniqueName;
        this._updateRadioButtonNames();
    }

    /** Unique id for the radio group. If none is supplied, defaults to name. */
    @Input()
    get id(): string {
        return this._componentId || this._name;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._name;
    }

    /** Value of radio buttons */
    @Input()
    get value(): any {
        return this._value;
    }

    set value(newValue: any) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedRadio();
            this._checkSelectedRadio();
        }
    }

    /** Boolean value that enables/disables the radio group */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(value: boolean) {
        this._isDisabled = parseBooleanAttribute(value);
        this._markRadiosForCheck();
    }

    /** Boolean value of whether the radio group is required on a form */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(value: boolean) {
        this._isRequired = parseBooleanAttribute(value);
        this._markRadiosForCheck();
    }

    /** Gets and sets the currently selected value of the radio button group */
    get selected(): RadioButtonComponent | null {
        return this._selected;
    }

    set selected(button: RadioButtonComponent | null) {
        this._selected = button;
        this.value = button ? button.value : null;
        this._checkSelectedRadio();
    }

    /** Sets the layout orientation of the radio button group; defaults to false */
    @Input()
    get inline(): boolean {
        return this._inline;
    }

    set inline(value: boolean) {
        this._inline = parseBooleanAttribute(value);
        this._verticalClass = !this._inline;
        this._horizontalClass = this._inline;
    }

    /** If true, condense the default margin and reduce the font size on all contained radios. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value : boolean) {
        this._tight = parseBooleanAttribute(value);
    }

    /** Sets the position all radios in the group relative to their associated label. *Defaults to `center`.*  */
    @Input()
    get align(): 'center' | 'top' | 'bottom' {
        return this._align;
    }
    set align( value: 'center' | 'top' | 'bottom' ) {
        this._align = value;
        this._markRadiosForCheck();
    }

    constructor(
        private _cdRef: ChangeDetectorRef,
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

    ngAfterContentInit(): void {
        this._initialized = true;
        setTimeout(() => this._markRadiosForCheck());
    }

    writeValue(value: any): void {
        this.value = value;
        this._cdRef.markForCheck();
    }

    public onChange: (value: unknown) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    _touch(): void {
        if (this.onTouch) {
            this.onTouch();
        }
    }

    _emitChangeEvent(): void {
        if (this._initialized) {
            this.change.emit(new RadioButtonChangeEvent(this._selected, this.value));
        }
    }

    private _markRadiosForCheck() {
        if (this.radios) {
            this.radios.forEach(radio => radio._markForCheck());
        }
    }

    private _updateSelectedRadio() {
        const isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this.radios && !isAlreadySelected) {
            this._selected = null;
            this.radios.forEach(radio => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }

    private _checkSelectedRadio() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }

    private _updateRadioButtonNames(): void {
        if (this.radios) {
            this.radios.forEach(radio => {
                radio.name = this.name;
            });
        }
    }

    get _errorState(): boolean {
        return !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );
    }
}

/** Event type that is emitted when a radio button or radio button group changes */
export class RadioButtonChangeEvent {
    /**
     * @param source the radio button that fired the event
     * @param value the value of that radio button
     */
    constructor(public source: RadioButtonComponent | null, public value: any) {}
}

/** Radio buttons allow the user to choose only one of a predefined set of mutually exclusive options. */
@Component({
    selector: 'hc-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit, AfterContentInit, OnDestroy {
    private _uniqueId = `hc-radio-button-${nextUniqueId++}`;
    /** Element id for the radio button. Auto-generated id will be used if none is set */
    @Input()
    id: string = this._uniqueId;
    /** Name of radio button */
    @Input()
    name: string;
    /** Event emitted when the value of the radio button changes */
    @Output()
    change = new EventEmitter<RadioButtonChangeEvent>();
    private _checked = false;
    private _value: any = null;
    private _required = false;
    private _disabled = false;
    private _tight = false;
    private _align: 'center' | 'top' | 'bottom' = 'center';
    private readonly radioGroup: RadioGroupDirective | null;

    private unsubscribe$ = new Subject<void>();

    @ContentChild(InputDirective)
    _inputChild: InputDirective;

    /** Value of radio buttons */
    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        if (this._value !== value) {
            this._value = value;
            if (this.radioGroup !== null && !this.checked) {
                this.checked = this.radioGroup.value === value;
            } else if (this.radioGroup !== null && this.checked) {
                this.radioGroup.selected = this;
            }
        }
    }

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this.id;
    }

    /** Boolean value of whether the radio button is required */
    @Input()
    get required(): boolean {
        return this._required || (this.radioGroup != null && this.radioGroup.required);
    }

    set required(required : boolean) {
        this._required = parseBooleanAttribute(required);
    }

    /** Boolean value that enables/disables the radio button */
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }

    set disabled(isDisabled: boolean) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    /** Boolean that returns whether the radio button is selected */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        const newCheckedState = parseBooleanAttribute(value);
        if (this._checked !== newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                this.radioGroup.selected = this;
            } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                this.radioGroup.selected = null;
            }
            this.cdRef.markForCheck();
        }
    }

    get _inlineGroup(): boolean {
        if (this.radioGroup !== null) {
            return this.radioGroup.inline;
        } else {
            return false;
        }
    }

    /** If true, condense the default margin, reduce the font size, and decrease the circle size.
     * Inherits value from parent radio group if part of one. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        if (this.radioGroup !== null) {
            return this.radioGroup.tight;
        } else {
            return this._tight;
        }
    }
    set tight(value: boolean) {
        this._tight = parseBooleanAttribute(value);
    }

    /** Sets the position of the radio button relative to its associated label (if not already set in the group). *Defaults to `center`.*  */
    @Input()
    get align(): 'center' | 'top' | 'bottom' {
        if (this.radioGroup !== null) {
            return this.radioGroup.align;
        } else {
            return this._align;
        }
    };
    set align( value: 'center' | 'top' | 'bottom' ) {
        this._align = value;
    }

    get _overlayClass(): string {
        const tightClass = this.tight ? '-tight' : '';
        return 'hc-radio-overlay hc-radio-align-' + this.align + tightClass;
    }

    get _inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    constructor(@Optional() radioGroup: RadioGroupDirective, private cdRef: ChangeDetectorRef, public _elementRef: ElementRef) {
        this.radioGroup = radioGroup;
    }

    ngOnInit(): void {
        if (this.radioGroup !== null) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    }

    ngAfterContentInit(): void {
        if ( this._inputChild ) {
            this._inputChild.focusChanged.pipe(takeUntil(this.unsubscribe$)).subscribe( state => {
                if ( state ) {
                    this._onInputChange();
                }
            });

            this._inputChild.inputEvent.pipe(takeUntil(this.unsubscribe$)).subscribe( event => {
                event.stopPropagation();
                this._onInputChange();
            });
        }
    }

    _onInputClick(event: Event): void {
        event.stopPropagation();
    }

    _onInputChange(event?: Event): void {
        if ( event ) {
            event.stopPropagation();
        }
        const valueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this._emitChangeEvent();
        if (this.radioGroup !== null) {
            this.radioGroup.onChange(this.value);
            this.radioGroup._touch();
            if (valueChanged) {
                this.radioGroup.value = this.value;
                this.radioGroup._emitChangeEvent();
            }
        } else {
            this.checked = true;
        }
    }

    private _emitChangeEvent(): void {
        this.change.emit(new RadioButtonChangeEvent(this, this.value));
    }

    _markForCheck(): void {
        this.cdRef.markForCheck();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
