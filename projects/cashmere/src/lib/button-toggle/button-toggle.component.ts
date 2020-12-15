import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { parseBooleanAttribute } from '../util';


/** Button Toggle components are the individually selectable buttons used within the Button Toggle Group component. */

@Component({
    selector: 'hc-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ButtonToggleComponent {
    _disabled = false;
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
    set selected(isSelected) {
        this._selected = parseBooleanAttribute(isSelected);
        this._toggleClick.emit(this);
    }

    /** Whether the toggle is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    @HostListener('click')
    _onClick() {
        this.selected = !this.selected;
    }
}
