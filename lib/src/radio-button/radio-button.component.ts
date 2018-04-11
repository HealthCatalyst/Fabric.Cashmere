import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    HostBinding, Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { anyToBoolean } from '../util';

let nextUniqueId = 0;

export class RadioButtonChangeEvent {
    constructor(public source: RadioButtonComponent | null, public value: any) {
    }
}


@Component({
    selector: 'hc-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit {
    private uniqueId = `hc-radio-button-${nextUniqueId++}`;
    @Input() id: string = this.uniqueId;
    @Input() name: string;
    @Output() change = new EventEmitter<RadioButtonChangeEvent>();
    private _checked: boolean = false; // radio is selected
    private _value: any = null; // value of radio button
    private _required: boolean = false;
    private _disabled: boolean = false;
    private readonly radioGroup: RadioGroupDirective;

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
    get getHostId(): string {
        return this.uniqueId;
    }

    @Input()
    get required(): boolean {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }

    set required(required) {
        this._required = anyToBoolean(required);
    }

    @Input()
    get disabled(): boolean {
        return this._disabled || (this.radioGroup && this.radioGroup.disabled);
    };

    set disabled(isDisabled) {
        this._disabled = anyToBoolean(isDisabled);
    }

    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        let newCheckedState = anyToBoolean(value);
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

    get inputId() {
        if (this.id) {
            return this.id;
        }
        return `${this.uniqueId}-input`;
    }

    constructor(@Optional() @Inject(forwardRef(() => RadioGroupDirective)) radioGroup: RadioGroupDirective,
                private cdRef: ChangeDetectorRef) {

        this.radioGroup = radioGroup;
    }

    ngOnInit() {
        if (this.radioGroup !== null) {
            this.checked = this.radioGroup.value === this._value;
            this.name = this.radioGroup.name;
        }
    }

    onInputClick(event: Event) {
        event.stopPropagation();
    }

    onInputChange(event: Event) {
        event.stopPropagation();
        const valueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup !== null) {
            this.radioGroup._onChangeFn(this.value);
            this.radioGroup.touch();
            if (valueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    }

    private emitChangeEvent(): void {
        this.change.emit(new RadioButtonChangeEvent(this, this.value));
    }

    markForCheck() {
        this.cdRef.markForCheck();
    }
}

@Directive({
    // tslint:disable:directive-selector
    selector: 'hc-radio-group',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroupDirective),
        multi: true
    }],
    exportAs: 'hcRadioGroup'
})
export class RadioGroupDirective implements ControlValueAccessor, AfterContentInit {
    @Output() change: EventEmitter<RadioButtonChangeEvent> = new EventEmitter<RadioButtonChangeEvent>();
    @ContentChildren(forwardRef(() => RadioButtonComponent), {descendants: true})
    _radios: QueryList<RadioButtonComponent>;
    private _value: any = null;
    private _name = `hc-radio-group-${nextUniqueId++}`;
    private _disabled = false;
    private _required = false;
    private _initialized = false; // if value of radio group has been set to initial value
    private _selected: RadioButtonComponent | null = null; // the currently selected radio
    _onChangeFn: (value: any) => void = () => {
    };
    onTouched: () => any = () => {
    };

    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
        this._updateRadioButtonNames();
    }

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

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = anyToBoolean(value);
        this._markRadiosForCheck();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value) {
        this._required = anyToBoolean(value);
        this._markRadiosForCheck();
    }

    get selected(): RadioButtonComponent | null {
        return this._selected;
    }

    set selected(button: RadioButtonComponent | null) {
        this._selected = button;
        this.value = button ? button.value : null;
        this._checkSelectedRadio();
    }

    constructor(private _cdRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this._initialized = true;
    }

    writeValue(value: any) {
        this.value = value;
        this._cdRef.markForCheck();
    }

    registerOnChange(fn: any) {
        this._onChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    // for when touch needs to be triggered from child radio button
    touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }

    emitChangeEvent(): void {
        if (this._initialized) {
            this.change.emit(new RadioButtonChangeEvent(this._selected, this.value));
        }
    }

    private _markRadiosForCheck() {
        if (this._radios) {
            this._radios.forEach(radio => radio.markForCheck());
        }
    }

    private _updateSelectedRadio() {
        let isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(radio => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            })
        }
    }

    private _checkSelectedRadio() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }

    private _updateRadioButtonNames(): void {
        if (this._radios) {
            this._radios.forEach(radio => {
                radio.name = this.name;
            });
        }
    }
}
