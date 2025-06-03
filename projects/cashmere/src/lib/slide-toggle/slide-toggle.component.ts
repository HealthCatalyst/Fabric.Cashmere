import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, Optional, Output, Self, ViewEncapsulation} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let nextToggleId = 1;

export enum buttonSize {
    small = 'sm',
    medium = 'md',
    large = 'lg'
}
export enum buttonStyle {
    blue = 'blue',
    purple = 'purple',
    green = 'green',
    red = 'red',
    orange = 'orange',
    rubyred = 'ruby-red',
    deepred = 'deep-red',
    redorange = 'red-orange',
    magenta = 'magenta',
    azure = 'azure',
    teal = 'teal',
    darkgreen = 'dark-green',
    yelloworange = 'yellow-orange',
    darkblue = 'dark-blue',
}
export enum labelPosition {
    left = 'left',
    right = 'right'
}

export function validateLabelType(inputStr: string): void {
    if (inputStr !== 'none' && inputStr !== 'on' && inputStr !== 'true' && inputStr !== 'yes' ) {
        throw Error('Unsupported inside label type: ' + inputStr);
    }
}

/** A boolean control that can be toggled via clicking  */
@Component({
    selector: 'hc-slide-toggle',
    templateUrl: 'slide-toggle.component.html',
    styleUrls: ['slide-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: HcFormControlComponent, useExisting: forwardRef(() => SlideToggleComponent) }],
    standalone: false
})
export class SlideToggleComponent extends HcFormControlComponent implements AfterViewInit, OnDestroy {
    private _uniqueId = `hc-slide-toggle-${nextToggleId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _unsubscribe = new Subject<void>();
    _buttonState = true;
    _disabled = false;
    _insideLabel = 'on';
    _insideLabelTypes = {
        'none': [' ',' '],
        'on': ['ON','OFF'],
        'true': ['TRUE','FALSE'],
        'yes': ['YES','NO']
    };

    /** Unique id for the slide toggle element. If none is supplied, one will be auto-generated. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueId;
    }

    /** An optional label positioned outside of the slide toggle. Use `labelPosition` to set which side. */
    @Input() sideLabel = '';

    /** The text inside the toggle. Choose from: `none`, `on` (ON/OFF), `true` (TRUE/FALSE), `yes` (YES/NO). *Defaults to `on`**/
    @Input()
    get insideLabel(): string {
        return this._insideLabel;
    }

    set insideLabel(val: string) {
        validateLabelType(val);
        this._insideLabel = val;
    }

    /** Whether the individual toggle is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(val: boolean | string) {
        this._disabled = parseBooleanAttribute(val);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required( requiredVal: boolean | string ) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Sets the size of slide toggle. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `sm`.**/
    @Input() buttonSize: buttonSize = buttonSize.small;

    /** Sets the style of the slide toggle. Choose from: `'blue' | 'purple' | 'green' |` 'red' | 'orange' | 'ruby-red' | 'deep-red' | 'red-orange' | 'magenta' | 'azure' | 'teal' | 'dark-green' | 'yellow-orange' | 'dark-blue'. *Defaults to `blue`.**/
    @Input() buttonStyle: buttonStyle = buttonStyle.blue;

    /** Sets which side of slide toggle the outside label is positioned on. Choose from: `'left' | 'right' |`. *Defaults to `left`.**/
    @Input() labelPosition: labelPosition = labelPosition.left;

    /** Sets the on/off state of the toggle. Supports two-way binding. */
    @Input()
    get buttonState(): boolean {
        return this._buttonState;
    }

    set buttonState( val: boolean | string ) {
        const tempVal = parseBooleanAttribute(val);
        if ( tempVal !== this._buttonState ) {
            this._buttonState = parseBooleanAttribute(val);
            this.onChange(this._buttonState);
            this.buttonStateChanged.emit(this._buttonState);
        }
    }

    /** Event fired with boolean value when the toggle state is changed. */
    @Output() buttonStateChanged = new EventEmitter<boolean>();

    ngAfterViewInit(): void {
        if ( this._ngControl?.statusChanges ) {
            // delay() is necessary to make sure any form or control state changes have been applied before rechecking error states
            this._ngControl.statusChanges.pipe(delay(0), takeUntil(this._unsubscribe)).subscribe(() => this._updateErrorState());
        }
        if ( this._form ) {
            this._form.ngSubmit.pipe(takeUntil(this._unsubscribe)).subscribe(() => this._updateErrorState());
        }

        /** Monkey patching the markAsTouched function to call error state checking because there is not an event for touched changes */
        if ( this._ngControl && this._ngControl.control ) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            const originalMarkMethod = this._ngControl.control.markAsTouched;
            this._ngControl.control.markAsTouched = function () {
                // eslint-disable-next-line prefer-rest-params
                originalMarkMethod.apply(this, arguments);
                self._updateErrorState();
            };

            const originalMarkAllMethod = this._ngControl.control.markAllAsTouched;
            this._ngControl.control.markAllAsTouched = function () {
                // eslint-disable-next-line prefer-rest-params
                originalMarkAllMethod.apply(this, arguments);
                self._updateErrorState();
            };
        }
    }

    constructor(
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() @Self() public _ngControl: NgControl,
        private _changeRef: ChangeDetectorRef
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: unknown): void {
        // Prevent the form control from trying to write a value when removing the control
        if ( this.onChange.name !== 'noop' ) {
            this.buttonState = !!value;
        }
    }

    public onChange: (value: unknown) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    _onBlur(): void {
        this.onTouch();
        this._updateErrorState();
    }

    setDisabledState(disabledVal: boolean): void {
        this.disabled = disabledVal;
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
            this._changeRef.detectChanges();
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
