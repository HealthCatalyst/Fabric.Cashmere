/* tslint:disable:no-use-before-declare */

import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
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
    private uniqueId = `hc-checkbox-${nextCheckboxId++}`;
    private _checked: boolean = false;
    private _required: boolean = false;
    private _disabled: boolean = false;
    private _tabIndex: number;

    // list out all properties or attributes an input[type=checkbox] can have since we're wrapping the input
    @Input() value: string;
    @Input() indeterminate: boolean;
    @Input() id: string = this.uniqueId;
    @Input() name: string | null = null;

    @Output() change = new EventEmitter<CheckboxChangeEvent>();

    @ViewChild('checkboxInput') checkboxInput: ElementRef;

    @HostListener('blur')
    onBlur() {
        this.onTouchFunc();
    }

    @HostBinding('attr.id')
    get getHostId(): string {
        return this.id;
    }

    @HostBinding('class.hc-checkbox-checked')
    get getCheckboxCheckedClass(): boolean {
        return this.checked;
    }

    @HostBinding('class.hc-checkbox-disabled')
    get getCheckboxDisabledClass(): boolean {
        return this.disabled;
    }

    @HostBinding('class.hc-checkbox-indeterminate')
    get getCheckboxIndeterminateClass(): boolean {
        return this.indeterminate;
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(required) {
        this._required = parseBooleanAttribute(required);
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

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

    get tabIndex(): number {
        return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    get inputId() {
        return `${this.id || this.uniqueId}-input`;
    }

    private onChangeFunc: (value: any) => void = () => {};

    private onTouchFunc: () => any = () => {};

    constructor(@Attribute('tabindex') tabindex: string, private _renderer: Renderer2) {
        this.tabIndex = parseInt(tabindex, 10) || 0;
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChangeFunc = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouchFunc = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._renderer.setProperty(this.checkboxInput.nativeElement, 'disabled', isDisabled);
    }

    toggle() {
        this.checked = !this.checked;
    }

    clickEvent(event: Event) {
        event.stopPropagation(); // prevent native click event from being dispatched

        if (!this.disabled) {
            this.toggle();
            this.emitChangeEvent();
        }
    }

    stopChangeEvent(event: Event) {
        event.stopPropagation(); // prevent native change event from emitting its own object through output 'change'
    }

    private emitChangeEvent(): void {
        this.onChangeFunc(this.checked);
        this.change.emit(new CheckboxChangeEvent(this, this.checked));
    }

    _onBlur() {
        this.onTouchFunc();
    }
}
