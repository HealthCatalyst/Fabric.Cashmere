import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { parseBooleanAttribute } from '../util';


/** Button Toggle components are the individually selectable buttons used within the Button Toggle Group component. */

@Component({
    selector: 'hc-button-toggle',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ButtonToggleComponent {
    _disabled = false;
    _parentDisabled = false;
    _selected = false;

    @HostBinding('class') _hostClass = 'hc-button-toggle';

    /** Event emitted when this specific toggle is changed. */
    @Output()
    _toggleClick: EventEmitter<ButtonToggleComponent> = new EventEmitter();

    /** The value assigned to this particular toggle. Used by the group to get/set the value of the selected item(s). */
    @Input()
    value: string;

    /** Whether the toggle is currently selected. Updates the value of the group when set. *Defaults to `false`.* */
    @Input()
    get selected(): boolean {
        return this._selected;
    }
    set selected(isSelected: boolean) {
        this._selected = parseBooleanAttribute(isSelected);
        this._toggleClick.emit(this);
    }

    /** Whether the individual toggle is disabled */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(isDisabled: boolean) {
        this._disabled = parseBooleanAttribute(isDisabled);
        if ( this._disabled && !this._hostClass.includes( 'hc-toggle-disabled' )) {
            this._hostClass += ' hc-toggle-disabled';
        }
        if ( !this._disabled && this._hostClass.includes( 'hc-toggle-disabled' )) {
            this._hostClass.replace( ' hc-toggle-disabled', '' );
        }
    }

    @HostListener('click')
    _onClick(): void {
        if ( !this.disabled && !this._parentDisabled ) {
            this.selected = !this.selected;
        }
    }
}
