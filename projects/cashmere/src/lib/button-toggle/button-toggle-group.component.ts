
import { AfterContentInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import type { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonToggleChangeEvent } from './button-toggle-change-event';
import { parseBooleanAttribute } from '../util';
import { ButtonToggleComponent } from './button-toggle.component';
import { validateStyleInput, validateSizeInput, supportedStyles } from '../button/button.component';

/** `hc-button-toggle-group` components are on/off toggles with the appearance of an `hc-button`.
 * These toggle groups may be configured to behave as single-select (like radio buttons), or multi-select (like checkboxes). */
@Component({
    selector: 'hc-button-toggle-group',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonToggleGroupComponent implements AfterContentInit, OnDestroy {
    private _disabled = false;
    private _style: string = 'secondary';
    private _size: string = 'md';
    private _valueRequired: boolean = false;
    private _multiple: boolean = false;
    private unsubscribe$ = new Subject<void>();

    @HostBinding('class.hc-button-toggle-group') _hostClass = true;

    @ContentChildren(ButtonToggleComponent)
    _buttons: QueryList<ButtonToggleComponent>;

    /** Event fired whenever a change is made to any button toggle in the group. */
    @Output() selectionChangedEvent: EventEmitter<ButtonToggleChangeEvent> = new EventEmitter<ButtonToggleChangeEvent>();

    /** Sets style of toggle. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary'`.
    * If needed, colors from the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc). *Defaults to `secondary`.* */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }
    set buttonStyle(val: string) {
        validateStyleInput(val, 'ButtonToggleGroupComponent');
        if (supportedStyles.indexOf(val) < 0) {
            val = "button-" + val;
        }
        this._style = val;
        this._updateButtonStyle();
    }

    /** Sets size of toggle. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `md`.* */
    @Input()
    get size(): string {
        return this._size;
    }

    set size(size: string) {
        validateSizeInput(size, 'ButtonToggleGroupComponent');
        this._size = size;
        this._updateButtonStyle();
    }

    /** Whether multiple button toggles can be selected. *Defaults to `false`.* */
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(val) {
        this._multiple = parseBooleanAttribute(val);
    }

    /** Whether at least one button must remain selected. */
    @Input()
    get valueRequired(): boolean {
        return this._valueRequired;
    }
    set valueRequired(required) {
        this._valueRequired = parseBooleanAttribute(required);
    }

    /** Whether the entire toggle group is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => button._parentDisabled = this._disabled);
        }
        this._updateButtonStyle();
    }


    _updateButtonStyle() {
        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                const checkedClass = button.selected ? 'hc-toggle-checked' : '';
                const disabledClass = button.disabled || this.disabled ? 'hc-toggle-disabled' : '';
                const classStr = 'hc-button-toggle hc-' + this._style + ' ' + 'hc-' + this._size + ' ' + checkedClass + ' ' + disabledClass;
                button._hostClass = classStr.trim();
            });
        }
    }

    _updateValue(targetButton: ButtonToggleComponent) {
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

        this._updateButtonStyle();
    }

    ngAfterContentInit() {
        setTimeout(() => {
            this._updateInitiallySelected();
            this._updateButtonStyle();
        });

        if (this._buttons) {
            this._buttons.forEach((button: ButtonToggleComponent) => {
                button._parentDisabled = this.disabled;
                button._toggleClick.pipe(takeUntil(this.unsubscribe$)).subscribe(
                    (target: ButtonToggleComponent) => {
                        this._updateValue(target);
                        this.selectionChangedEvent.emit(new ButtonToggleChangeEvent(
                            target,
                            this._buttons.toArray()
                            , this._buttons.filter((btn: ButtonToggleComponent) => btn.selected).map(val => val.value)
                        ));
                    });
            });
        }
    }

    _updateInitiallySelected() {
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

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
