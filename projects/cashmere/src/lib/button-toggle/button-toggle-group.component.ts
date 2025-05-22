import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    ViewEncapsulation } from '@angular/core';
import type { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonToggleChangeEvent } from './button-toggle-change-event';
import { parseBooleanAttribute, validateInput } from '../util';
import { ButtonToggleComponent } from './button-toggle.component';
import { supportedSizes, supportedStyles } from '../button/button.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HcFormControlComponent } from '../form-field/hc-form-control.component';
import { supportedColors } from '../utils/supported-colors';


/** `hc-button-toggle-group` components are on/off toggles with the appearance of an `hc-button`.
 * These toggle groups may be configured to behave as single-select (like radio buttons), or multi-select (like checkboxes). */
@Component({
    selector: 'hc-button-toggle-group',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button-toggle.component.scss'],
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ButtonToggleGroupComponent),
            multi: true
        }],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ButtonToggleGroupComponent extends HcFormControlComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
    private _disabled = false;
    private _style = 'secondary';
    private _size = 'md';
    private _valueRequired = false;
    private _multiple = false;
    private unsubscribe$ = new Subject<void>();
    private _value;

    @HostBinding('class.hc-button-toggle-group') _hostClass = true;

    @ContentChildren(ButtonToggleComponent)
    _buttons: QueryList<ButtonToggleComponent>;

    /** Event fired whenever a change is made to any button toggle in the group. */
    @Output() selectionChangedEvent: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();

    /** Sets style of toggle. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary'`.
    * If needed, colors from the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc).
    * *Defaults to `secondary`.* */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }
    set buttonStyle(val: string) {
        validateInput(val, supportedColors.concat(supportedStyles), 'buttonStyle', 'ButtonToggleComponent');
        if (supportedStyles.indexOf(val) < 0) {
            val = "button-" + val;
        }
        this._style = val;
        this._updateButtonStyle();
    }

    @Input()
    get value(): unknown {
        return this._value;
    }

    set value(newValue: unknown) {
        if ( newValue !== undefined && this._value !== newValue) {
            this._value = newValue;
            this.onChange(newValue);
        }
    }

    /** Sets size of toggle. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `md`.* */
    @Input()
    get size(): string {
        return this._size;
    }

    set size(size: string) {
        validateInput(size, supportedSizes, 'size', 'ButtonToggleGroupComponent');
        this._size = size;
        this._updateButtonStyle();
    }

    /** Whether multiple button toggles can be selected. *Defaults to `false`.* */
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(val: boolean) {
        this._multiple = parseBooleanAttribute(val);
    }

    /** Whether at least one button must remain selected. */
    @Input()
    get valueRequired(): boolean {
        return this._valueRequired;
    }
    set valueRequired(required: boolean) {
        this._valueRequired = parseBooleanAttribute(required);
    }

    /** Whether the entire toggle group is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled: boolean) {
        this._disabled = parseBooleanAttribute(isDisabled);
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => button._parentDisabled = this._disabled);
        }
        this._updateButtonStyle();
    }

    ngAfterContentInit(): void {
        this._connectToButtonChildren();
        setTimeout(() => {
            this._setInitalModelAsNeeded();
            this._updateButtonStateFromModel();
            this._emitEventForInitiallySelected();
            this._updateButtonStyle();
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    writeValue(value: unknown): void {
        // Prevent the form control from trying to write a value when removing the control
        if ( this.onChange.name !== 'noop' ) {
            this._value = value;
            this._updateButtonStateFromModel();
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

    setDisabledState(state: boolean): void {
        this.disabled = state;
    }

    _touch(): void {
        if (this.onTouch) {
            this.onTouch();
        }
    }

    _updateButtonStyle(): void {
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                const checkedClass = button.selected ? 'hc-toggle-checked' : '';
                const disabledClass = button.disabled || this.disabled ? 'hc-toggle-disabled' : '';
                const classStr = 'hc-button-toggle hc-' + this._style + ' ' + 'hc-' + this._size + ' ' + checkedClass + ' ' + disabledClass;
                button._hostClass = classStr.trim();
            });
        }
    }

    _updateButtonStateFromModel(): void {
        this._buttons?.forEach((button: ButtonToggleComponent) => {
            if (this.multiple) {
                button._selected = this._value?.some(v => v === button.value);
            } else {
                button._selected = button.value === this._value;
            }
        });

        if (!this.multiple && this._buttons?.filter(b => b._selected).length > 1) {
            throw new Error(`Multiple buttons in group have same value (${this._value}).
                This is not allowed if "multiple" property isn't set to true.`);
        }
        this._updateButtonStyle();
    }

    _updateValueOnClick(targetButton: ButtonToggleComponent): void {
        if (!this.multiple) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                if (button !== targetButton) {
                    button._selected = false;
                }
                if (this.valueRequired && button === targetButton) {
                    button._selected = true;
                }
            });
        } else {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                if (this.valueRequired && this._buttons.filter((btn: ButtonToggleComponent) => btn.selected ).length === 0) {
                    if (button === targetButton) { button._selected = true; }
                }
            });
        }

        // if multiple = true, _value is an array, if not, _value should be a single value.
        const selectedValues = this._buttons.filter((btn: ButtonToggleComponent) => btn.selected).map(val => val.value);
        this.value = this.multiple ? selectedValues : selectedValues[0];
        this.onChange(this.value);

        this._updateButtonStyle();
    }

    /** The component allows you to set [selected] on individual buttons, so we need to honor that in the model. */
    private _setInitalModelAsNeeded() {
        this._value = this._value || (this.multiple ? [] : this.value);
        this._buttons.forEach((button: ButtonToggleComponent) => {
            if (button.selected) {
                if (this.multiple && !(this.value as Array<unknown>)?.includes(button.value)) {
                    (this.value as Array<unknown>)?.push(button.value);
                }

                if (!this.multiple) {
                    this.value = button.value;
                }
            } else {
                if (this.multiple && (this.value as Array<unknown>)?.includes(button.value)) {
                    (this.value as Array<unknown>)?.splice((this.value as Array<unknown>)?.indexOf(button.value, 1));
                }
            }
        });
    }

    private _emitEventForInitiallySelected() {
        if (this._buttons.some((button: ButtonToggleComponent) => {
            return button.selected;
        })) {
            this.selectionChangedEvent.emit(new ButtonToggleChangeEvent(
                null,
                this._buttons.toArray()
                , this._buttons.filter((btn: ButtonToggleComponent) => btn.selected).map(val => val.value)
            ));
        }
    }

    private _connectToButtonChildren() {
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                button._parentDisabled = this.disabled;
                this._subscribeToButtonClick(button);
            });
        }
    }

    private _subscribeToButtonClick(button: ButtonToggleComponent) {
        button._toggleClick.pipe(takeUntil(this.unsubscribe$)).subscribe(
            (target: ButtonToggleComponent) => {
                this._updateValueOnClick(target);
                this.selectionChangedEvent.emit(new ButtonToggleChangeEvent(
                    target,
                    this._buttons.toArray()
                    , this._buttons.filter((btn: ButtonToggleComponent) => btn.selected).map(val => val.value)
                ));
            });
    }
}
