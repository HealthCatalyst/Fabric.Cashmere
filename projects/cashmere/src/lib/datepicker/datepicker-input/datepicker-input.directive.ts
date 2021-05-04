import {forwardRef, Directive, ElementRef, Optional, Inject, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    Validator,
    ValidatorFn,
    ValidationErrors,
    AbstractControl,
    ControlValueAccessor,
    Validators
} from '@angular/forms';
import {createMissingDateImplError} from '../datetime/datepicker-errors';
import {DatepickerComponent} from '../datepicker.component';
import {parseBooleanAttribute} from '../../util';
import {Subscription} from 'rxjs';
import {D, HC_DATE_FORMATS, HcDateFormats} from '../datetime/date-formats';
import {DateAdapter} from '../datetime/date-adapter';
import {HcFormControlComponent} from '../../form-field/hc-form-control.component';
import {HcFormFieldComponent} from '../../form-field/hc-form-field.component';

// tslint:disable:no-host-metadata-property
// tslint:disable:member-ordering

/** @docs-private */
export const HC_DATEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerInputDirective),
    multi: true
};

/** @docs-private */
export const HC_DATEPICKER_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatepickerInputDirective),
    multi: true
};

/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use hcDatepickerInputEvent instead.
 */
export class HcDatepickerInputEvent {
    /** The new value for the target datepicker input. */
    value: D | null;

    constructor(
        /** Reference to the datepicker input component that emitted the event. */
        public target: DatepickerInputDirective,
        /** Reference to the native input element associated with the datepicker input. */
        public targetElement: HTMLElement
    ) {
        this.value = this.target.value;
    }
}

@Directive({
    selector: 'input[hcDatepicker]',
    host: {
        '[attr.aria-haspopup]': 'true',
        '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
        '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
        '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
        '[disabled]': 'disabled',
        '(input)': '_onInput($event.target.value)',
        '(change)': '_onChange()',
        '(blur)': '_onBlur()',
        '(keydown)': '_onKeydown($event)'
    },
    providers: [
        HC_DATEPICKER_VALUE_ACCESSOR,
        HC_DATEPICKER_VALIDATORS,
        {provide: HcFormControlComponent, useExisting: forwardRef(() => DatepickerInputDirective)}
    ]
})
export class DatepickerInputDirective implements ControlValueAccessor, OnDestroy, Validator {
    /** The datepicker that this input is associated with. */
    @Input()
    set hcDatepicker(value: DatepickerComponent) {
        if (!value) {
            return;
        }

        this._datepicker = value;
        this._datepicker._registerInput(this);
        this._datepickerSubscription.unsubscribe();

        this._datepickerSubscription = this._datepicker._selectedChanged.subscribe((selected: D) => {
            this.setDate(selected);
        });
    }
    _datepicker: DatepickerComponent;

    /** Function that can be used to filter out dates within the datepicker. */
    @Input()
    set hcDatepickerFilter(value: (date: D | null) => boolean) {
        this._dateFilter = value;
        this._validatorOnChange();
    }
    _dateFilter: (date: D | null) => boolean;

    /** The value of the input. */
    @Input()
    get value(): D | null {
        return this._value;
    }
    set value(value: D | null) {
        value = this._dateAdapter.deserialize(value);
        this._lastValueValid = !value || this._dateAdapter.isValid(value);
        value = this._getValidDateOrNull(value);
        const oldDate = this.value;
        this._value = value;
        this._formatValue(value);

        if ( value ) {
            this._timeDate = value;
        }
        if (!this._dateAdapter.sameDate(oldDate, value)) {
            this._valueChange.emit(value);
        }
    }
    private _value: D | null;

    /** The minimum valid date. */
    @Input()
    get min(): D | null {
        return this._min;
    }
    set min(value: D | null) {
        this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    private _min: D | null;

    /** The maximum valid date. */
    @Input()
    get max(): D | null {
        return this._max;
    }
    set max(value: D | null) {
        this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    private _max: D | null;

    /** Whether the datepicker-input is disabled. */
    @Input()
    get disabled(): boolean {
        return !!this._disabled;
    }
    set disabled(value: boolean) {
        const newValue = parseBooleanAttribute(value);
        const element = this._elementRef.nativeElement;

        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._disabledChange.emit(newValue);
        }

        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    private _disabled: boolean;

    /** Emits when a `change` event is fired on this `<input>`. */
    @Output()
    readonly dateChange: EventEmitter<HcDatepickerInputEvent> = new EventEmitter<HcDatepickerInputEvent>();

    /** Emits when an `input` event is fired on this `<input>`. */
    @Output()
    readonly dateInput: EventEmitter<HcDatepickerInputEvent> = new EventEmitter<HcDatepickerInputEvent>();

    /** Stores the mode & hourCycle for the inputs of the date range (which don't have a DatePickerComponent) */
    @Input() _mode: string;
    @Input() _hourCycle: number;

    /** Emits when the value changes (either due to user input or programmatic change). */
    _valueChange = new EventEmitter<D | null>();

    /** Emits when the disabled state has changed */
    _disabledChange = new EventEmitter<boolean>();

    _onTouched = () => {};

    private _cvaOnChange: (value: any) => void = () => {};

    private _validatorOnChange = () => {};

    private _datepickerSubscription = Subscription.EMPTY;

    private _localeSubscription = Subscription.EMPTY;

    // Stores a placeholder date value to be used for parsing when in time-only mode
    private _timeDate: Date = new Date();

    /** The form control validator for whether the input parses. */
    private _parseValidator: ValidatorFn = (): ValidationErrors | null => {
        return this._lastValueValid ? null : {hcDatepickerParse: {text: this._elementRef.nativeElement.value}};
    };

    /** The form control validator for the min date. */
    private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
        return !this.min || !controlValue || this._dateAdapter.compareDate(this.min, controlValue) <= 0
            ? null
            : {hcDatepickerMin: {min: this.min, actual: controlValue}};
    };

    /** The form control validator for the max date. */
    private _maxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
        return !this.max || !controlValue || this._dateAdapter.compareDate(this.max, controlValue) >= 0
            ? null
            : {hcDatepickerMax: {max: this.max, actual: controlValue}};
    };

    /** The form control validator for the date filter. */
    private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
        return !this._dateFilter || !controlValue || this._dateFilter(controlValue) ? null : {hcDatepickerFilter: true};
    };

    /** The combined form control validator for this input. */
    private _validator: ValidatorFn | null = Validators.compose([
        this._parseValidator,
        this._minValidator,
        this._maxValidator,
        this._filterValidator
    ]);

    /** Whether the last value set on the input was valid. */
    private _lastValueValid = false;

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        @Optional() public _dateAdapter: DateAdapter<D>,
        @Optional()
        @Inject(HC_DATE_FORMATS)
        private _dateFormats: HcDateFormats,
        @Optional() private _formField: HcFormFieldComponent
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('HC_DATE_FORMATS');
        }

        // Update the displayed date when the locale changes.
        this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
            this.value = this.value;
        });
    }

    ngOnDestroy() {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    }

    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void {
        this._validatorOnChange = fn;
    }

    /** @docs-private */
    validate(c: AbstractControl): ValidationErrors | null {
        return this._validator ? this._validator(c) : null;
    }

    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    getConnectedOverlayOrigin(): ElementRef {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    }

    /** Sets the focus on the input element */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    // Implemented as part of ControlValueAccessor.
    writeValue(value: D): void {
        this.value = value;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn: (value: any) => void): void {
        this._cvaOnChange = fn;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Set the date programmatically
    setDate(selected: D) {
        this.value = selected;
        this._cvaOnChange(selected);
        this._onTouched();
        this.dateInput.emit(new HcDatepickerInputEvent(this, this._elementRef.nativeElement));
        this.dateChange.emit(new HcDatepickerInputEvent(this, this._elementRef.nativeElement));
    }

    _onKeydown(event: KeyboardEvent) {
        const isAltDownArrow = event.altKey && event.key === 'ArrowDown';

        if (this._datepicker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
            this._datepicker.open();
            event.preventDefault();
        }
    }

    _onInput(value: string) {
        // Add stored date value to a time-only input for javascript date object parsing
        let pickerMode = this._datepicker ? this._datepicker.mode : this._mode;
        if ( pickerMode === 'time' ) {
            value = this._timeDate.getDate()  + '/' + (this._timeDate.getMonth() + 1) + '/' + this._timeDate.getFullYear() + ' ' + value;
        }

        let date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);

        /** Two-digit year input conversion method for IE
         * Based on the current year, assume that the four-digit year date should be in
         * either the next 30 years, or the preceding 70 years */
        if (date) {
            let inputString: string = this._elementRef.nativeElement.value;
            /** Skip this check if the input string contains any 3+ digit numerical values - assumed to be a year */
            if (!inputString.match(/[1-9][0-9][0-9]/g)) {
                let currentDate = new Date();
                if (date.getFullYear() >= currentDate.getFullYear() + 30) {
                    date.setFullYear(date.getFullYear() - 100);
                } else if (date.getFullYear() < currentDate.getFullYear() - 70) {
                    date.setFullYear(date.getFullYear() + 100);
                }
            }
        }

        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._getValidDateOrNull(date);

        if (!this._dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this._cvaOnChange(date);
            this._valueChange.emit(date);
            this.dateInput.emit(new HcDatepickerInputEvent(this, this._elementRef.nativeElement));
        }
    }

    _onChange() {
        this.dateChange.emit(new HcDatepickerInputEvent(this, this._elementRef.nativeElement));
    }

    /** Handles blur events on the input. */
    _onBlur() {
        // Reformat the input only if we have a valid value.
        if (this.value || this._elementRef.nativeElement.value) {
            this._formatValue(this.value);
        }

        this._onTouched();
    }

    /** Formats a value and sets it on the input element. */
    private _formatValue(value: D | null) {
        let dateFormat: any = this._dateFormats.display.dateInput;
        let tempMode: string = 'date';
        let tempCycle: number = 12;

        if (this._datepicker) {
            tempMode = this._datepicker.mode;
            tempCycle = +this._datepicker.hourCycle;
        } else if (this._mode) {
            tempMode = this._mode;
            if (this._hourCycle) {
                tempCycle = this._hourCycle;
            }
        }

        if (tempMode === 'time') {
            let tempFormat = this._dateFormats.display.timeInput;
            tempFormat['hour12'] = tempCycle === 12;
            dateFormat = tempFormat;
        } else if (tempMode === 'date-time') {
            let tempFormat = this._dateFormats.display.dateTimeInput;
            tempFormat['hour12'] = tempCycle === 12;
            dateFormat = tempFormat;
        }
        this._elementRef.nativeElement.value = value ? this._dateAdapter.format(value, dateFormat) : '';
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
