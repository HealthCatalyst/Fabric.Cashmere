/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */

import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

const supportedColors = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'tertiary'];

export function validateButtonColor(btnColor: string) {
    if (supportedColors.indexOf(btnColor) < 0) {
        throw Error('Unsupported color input value: ' + btnColor);
    }
}

/** Cashmere styled button */
@Component({
    selector: 'button[hc-button]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button.component.scss'],
    host: {
        '[disabled]': 'disabled || null'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
    private _disabled = false;
    private _color: string;
    private _previousColor: string;

    /** Sets background color to one of: 'primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'tertiary' */
    @Input()
    get color(): string {
        return this._color;
    }

    set color(btnColor: string) {
        validateButtonColor(btnColor);

        this._setHostColor(btnColor);
        this._previousColor = this._color;
        this._color = btnColor;
    }

    /** Whether the control is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    @HostBinding('class.hc-button')
    get _buttonClass(): boolean {
        return true;
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.color = 'primary';
        this._previousColor = this.color;
    }

    /** Used to give focus to the button */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    private _setHostColor(color: string) {
        if (this._previousColor !== color) {
            if (this._previousColor) {
                this.renderer.removeClass(this.elementRef.nativeElement, this._colorClass(this._previousColor));
            }
            this.renderer.addClass(this.elementRef.nativeElement, this._colorClass(color));
        }
    }

    private _colorClass(color: string): string {
        return `hc-${color}`;
    }
}
