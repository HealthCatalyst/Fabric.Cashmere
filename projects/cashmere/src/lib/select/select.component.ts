/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Component,
    forwardRef,
    HostBinding,
    Input,
    ViewEncapsulation,
    ElementRef,
    Optional,
    Self,
    Output,
    EventEmitter,
    ViewChild,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';
import {SelectService, _buildValueString} from './select.service';

let uniqueId = 1;

export class SelectChangeEvent {
    constructor(public source: SelectComponent, public value: any) {}
}

/** Select one of many options from a dropdown */
@Component({
    selector: 'hc-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SelectService, {provide: HcFormControlComponent, useExisting: forwardRef(() => SelectComponent)}]
})
export class SelectComponent extends HcFormControlComponent implements ControlValueAccessor, AfterViewInit {
    private _uniqueInputId = `hc-select-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _value: any = '';
    get _optionMap(): Map<string, any> {
        return this.selectService._optionMap;
    }
    _componentId = this._uniqueInputId; // contains id for the hc-select component

    @ViewChild('selectInput')
    _nativeSelect: ElementRef;

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

    set value(val: any) {
        if (val !== this._value) {
            this._value = val;
            this.onChange(val);
        }
    }

    /** If true, condense the default margin and reduce the font size. *Defaults to `false`.*  */
    @Input()
    get tight(): boolean {
        return this._tight;
    }
    set tight(value) {
        this._tight = parseBooleanAttribute(value);
    }

    get _errorState(): boolean {
        return !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );
    }

    @Output()
    readonly focus: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    readonly blur: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted whenever the state changes */
    @Output()
    change = new EventEmitter<SelectChangeEvent>();

    @HostBinding('class.hc-select')
    _hostClass = true;

    @HostBinding('class.hc-select-disabled')
    get _disabledClass() {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    /** A function to compare the option values with the selected values. The first argument is a value from an option.
     * The second is a value from the selection(model). A boolean should be returned. */
    @Input()
    set compareWith(fn: (o1: any, o2: any) => boolean) {
        if (typeof fn !== 'function') {
            throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
        }
        this._compareWith = fn;
    }

    private _compareWith: (o1: any, o2: any) => boolean = Object.is;

    constructor(
        private _renderer: Renderer2,
        private selectService: SelectService,
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

    ngAfterViewInit() {
        this._applyValueToNativeControl();
    }

    public onChange: (value: unknown) => void = () => undefined;
    public onTouch: () => unknown = () => undefined;
    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => unknown): void {
        this.onTouch = fn;
    }

    writeValue(value: any) {
        this._value = value;
        this._applyValueToNativeControl();
    }

    _applyValueToNativeControl() {
        const id: string | null = this._getOptionId(this._value);
        if (!this._nativeSelect) {
            return;
        }
        if (id == null) {
            const selectedIndex = this.placeholder ? 0 : -1;
            this._renderer.setProperty(this._nativeSelect.nativeElement, 'selectedIndex', selectedIndex);
        }
        const valueString = _buildValueString(id, this._value);
        this._renderer.setProperty(this._nativeSelect.nativeElement, 'value', valueString);
    }

    _change(event: Event, value: any) {
        event.stopPropagation();
        this._value = this._getOptionValue(value);
        this.onChange(this._value);
        this.change.emit(new SelectChangeEvent(this, this._value));
    }

    _getOptionId(value: any): string | null {
        for (const id of Array.from(this._optionMap.keys())) {
            if (this._compareWith(this._optionMap.get(id), value)) {
                return id;
            }
        }
        return null;
    }

    _getOptionValue(valueString: string): any {
        const id: string = this._extractId(valueString);
        return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
    }

    _extractId(valueString: string): string {
        return valueString.split(':')[0];
    }
}
