import {Component, EventEmitter, forwardRef, Input, Optional, Output, Self, ViewEncapsulation} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
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
    green = 'green'
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
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => SlideToggleComponent)}]
})
export class SlideToggleComponent extends HcFormControlComponent {
    private _uniqueId = `hc-slide-toggle-${nextToggleId++}`;
    private _form: NgForm | FormGroupDirective | null;
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

    /** Sets the style of the slide toggle. Choose from: `'blue' | 'purple' | 'green' |`. *Defaults to `blue`.**/
    @Input() buttonStyle: buttonStyle = buttonStyle.blue;

    /** Sets which side of slide toggle the outside label is positioned on. Choose from: `'left' | 'right' |`. *Defaults to `left`.**/
    @Input() labelPosition: labelPosition = labelPosition.left;

    /** Sets the on/off state of the toggle. Supports two-way binding. */
    @Input()
    get buttonState(): boolean {
        return this._buttonState;
    }

    set buttonState( val: boolean | string ) {
        this._buttonState = parseBooleanAttribute(val);
        this.onChange(this._buttonState);
        this.buttonStateChanged.emit(this._buttonState);
    }

    /** Event fired with boolean value when the toggle state is changed. */
    @Output() buttonStateChanged = new EventEmitter<boolean>();

    constructor(
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() @Self() public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: unknown): void {
        this.buttonState = !!value;
    }

    public onChange: (value: unknown) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    get _errorState(): boolean {
        return !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );
    }
}
