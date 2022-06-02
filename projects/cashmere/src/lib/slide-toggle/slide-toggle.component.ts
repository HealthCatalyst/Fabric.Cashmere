import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

export enum buttonSize {
    small = 'sm',
    medium = 'md',
    large = 'lg'
}
export enum buttonStyle {
    blue = 'blue',
    purple = 'purple',
    green = 'green'
}
export enum labelPosition {
    left = 'left',
    right = 'right'
}

export function validateLabelType(inputStr: string): void {
    if (inputStr !== 'none' && inputStr !== 'on' && inputStr !== 'true' && inputStr !== 'yes' ) {
        throw Error('Unsupported inside label type: ' + inputStr);
    }
}

/** A boolean control that can be toggled via clicking  */
@Component({
    selector: 'hc-slide-toggle',
    templateUrl: 'slide-toggle.component.html',
    styleUrls: ['slide-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SlideToggleComponent {
    _disabled = false;
    _insideLabel = 'on';
    _insideLabelTypes = {
        'none': [' ',' '],
        'on': ['ON','OFF'],
        'true': ['TRUE','FALSE'],
        'yes': ['YES','NO']
    };

    /** An optional label positioned outside of the slide toggle. Use `labelPosition` to set which side. */
    @Input() sideLabel = '';

    /** The text inside the toggle. Choose from: `none`, `on` (ON/OFF), `true` (TRUE/FALSE), `yes` (YES/NO). *Defaults to `on`**/
    @Input()
    get insideLabel(): string {
        return this._insideLabel;
    }

    set insideLabel(val: string) {
        validateLabelType(val);
        this._insideLabel = val;
    }

    /** Whether the individual toggle is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(val: boolean) {
        this._disabled = parseBooleanAttribute(val);
    }

    /** Sets the size of slide toggle. Choose from: `'sm' | 'md' | 'lg' |`. *Defaults to `sm`.**/
    @Input() buttonSize: buttonSize = buttonSize.small;

    /** Sets the style of the slide toggle. Choose from: `'blue' | 'purple' | 'green' |`. *Defaults to `blue`.**/
    @Input() buttonStyle: buttonStyle = buttonStyle.blue;

    /** Sets which side of slide toggle the outside label is positioned on. Choose from: `'left' | 'right' |`. *Defaults to `left`.**/
    @Input() labelPosition: labelPosition = labelPosition.left;

    /** Sets the on/off state of the toggle. Supports two-way binding. */
    @Input() buttonState = true;

    /** Event fired with boolean value when the toggle state is changed. */
    @Output() buttonStateChanged = new EventEmitter<boolean>();

    _switchChanged(e: boolean): void {
        this.buttonStateChanged.emit(e);
    }
}
