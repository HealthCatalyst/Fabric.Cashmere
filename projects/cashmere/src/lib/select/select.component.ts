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
    EventEmitter,
    ViewChild,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';

let uniqueId = 1;

export class SelectChangeEvent {
    constructor(public source: SelectComponent, public value: any) {}
}

/** Builds a value string to help with matching objects */
export function _buildValueString(id: string|null, value: any): string {
    if (id == null) { return `${value}`; }
    if (value && typeof value === 'object') { value = 'Object'; }
    return `${id}: ${value}`.slice(0, 50);
}

/** Select one of many options from a dropdown */
@Component({
    selector: 'hc-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => SelectComponent)}]
})
export class SelectComponent extends HcFormControlComponent implements ControlValueAccessor, DoCheck, AfterViewInit {
    private _uniqueInputId = `hc-select-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _value: any = '';
    _optionIdCounter: number = 0; // tracks ids for select options
    _optionMap: Map<string, any> = new Map<string, any>();
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

    ngAfterViewInit() {
        this._applyValueToNativeControl();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        this._value = value;
        this._applyValueToNativeControl();
    }

    _applyValueToNativeControl() {
        const id: string|null = this._getOptionId(this._value);
        if (!this._nativeSelect) { return; }
        if (id == null) {
            const selectedIndex = this.placeholder ? 0 : -1;
            this._renderer.setProperty(this._nativeSelect.nativeElement, 'selectedIndex', -1);
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

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    _registerOption(): string {
        return (this._optionIdCounter++).toString();
    }

    _getOptionId(value: any): string|null {
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
