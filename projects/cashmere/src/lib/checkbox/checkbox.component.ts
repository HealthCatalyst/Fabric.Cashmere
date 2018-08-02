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
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {parseBooleanAttribute} from '../util';

let nextCheckboxId = 1;

export class CheckboxChangeEvent {
    constructor(public source: CheckboxComponent, public checked: boolean) {}
}

export const hcCheckboxValueAccessor: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

@Component({
    selector: 'hc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [hcCheckboxValueAccessor],
    exportAs: 'hcCheckbox'
})
export class CheckboxComponent implements ControlValueAccessor {
    private _uniqueId = `hc-checkbox-${nextCheckboxId++}`;
    private _checked: boolean = false;
    private _required: boolean = false;
    private _disabled: boolean = false;
    private _tabIndex: number;

    /** Value attribute of the native checkbox */
    @Input() value: string;

    /** Whether the checkbox is indeterminate. It can represent a checkbox with three states. */
    @Input() indeterminate: boolean;

    /** Unique id for the checkbox element. If none is supplied, one will be auto-generated. */
    @Input() id: string = this._uniqueId;

    /** Sets unique name used in a form */
    @Input() name: string | null = null;

    /** Event emitted whenever the state changes */
    @Output() change = new EventEmitter<CheckboxChangeEvent>();

    @ViewChild('checkboxInput') _checkboxInput: ElementRef;

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
        return this.disabled;
    }

    @HostBinding('class.hc-checkbox-indeterminate')
    get _getCheckboxIndeterminateClass(): boolean {
        return this.indeterminate;
    }

    /** Whether the checkbox is required. */
    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    /** Whether the checkbox is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
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
        return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    get _inputId() {
        return `${this.id || this._uniqueId}-input`;
    }

    private _onChangeFunc: (value: any) => void = () => {};

    private _onTouchFunc: () => any = () => {};

    constructor(@Attribute('tabindex') tabindex: string, private _renderer: Renderer2) {
        this.tabIndex = parseInt(tabindex, 10) || 0;
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._renderer.setProperty(this._checkboxInput.nativeElement, 'disabled', isDisabled);
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
}
