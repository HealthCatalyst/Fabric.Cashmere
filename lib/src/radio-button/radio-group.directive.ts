import {RadioButtonChangeEvent, RadioButtonComponent} from './radio-button.component';
import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    QueryList
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {parseBooleanAttribute} from '../util';

let nextUniqueId = 0;

@Directive({
    // tslint:disable:directive-selector
    selector: 'hc-radio-group',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioGroupDirective),
            multi: true
        }
    ],
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
    _onChangeFn: (value: any) => void = () => {};
    onTouched: () => any = () => {};

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
        this._disabled = parseBooleanAttribute(value);
        this._markRadiosForCheck();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value) {
        this._required = parseBooleanAttribute(value);
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

    constructor(private _cdRef: ChangeDetectorRef) {}

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
            });
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
