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
    ContentChildren,
    QueryList,
    ViewChild,
    AfterContentInit
} from '@angular/core';
import {ControlValueAccessor, NgForm, FormGroupDirective, NgControl} from '@angular/forms';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';
import {HcOptionDirective} from './hc-option.directive';

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
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => SelectComponent)}]
})
export class SelectComponent extends HcFormControlComponent implements ControlValueAccessor, AfterContentInit, DoCheck {
    private _uniqueInputId = `hc-select-${uniqueId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _tight: boolean = false;
    private _value: any = '';
    private _valueData: any;

    _componentId = this._uniqueInputId;

    @ContentChildren(HcOptionDirective)
    _options: QueryList<HcOptionDirective>;

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

    constructor(
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

    ngAfterContentInit() {
        if (this._valueData) {
            setTimeout(() => {
                this.writeValue(this._valueData);
            });
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

    writeValue(value: any) {
        this._valueData = value;
        let targetVal = value;
        // If ngValue is being used, set the currently selected value based on that data
        if (this._options && this._options.length !== 0) {
            let selectedIndex: number = 0;
            this._options.forEach((option, index) => {
                if (option.ngValue === value) {
                    selectedIndex = index;
                }
            });
            if (this.placeholder) {
                selectedIndex += 1;
            }
            targetVal = this._nativeSelect.nativeElement.options[selectedIndex].value;
        }
        this._value = targetVal;
    }

    _change(event: Event, value: any) {
        this._valueData = value;
        // If ngValue is being used, pull that value from the directive to allow objects well as strings
        if (this._options.length !== 0) {
            const optionArray = this._options.toArray();
            const index = this.placeholder
                ? this._nativeSelect.nativeElement.selectedIndex - 1
                : this._nativeSelect.nativeElement.selectedIndex;
            this._valueData = optionArray[index].ngValue;
        }

        event.stopPropagation();
        this._value = value;
        this.onChange(this._valueData);
        this.change.emit(new SelectChangeEvent(this, this._valueData));
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
