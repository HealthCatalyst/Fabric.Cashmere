/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */

import {ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

const supportedStyles = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'link', 'link-inline'];

export function validateStyleInput(style: string) {
    if (supportedStyles.indexOf(style) < 0) {
        throw Error('Unsupported style input value: ' + style);
    }
}

const buttonAttributes = ['hc-icon-button', 'hc-button'];

/** Cashmere styled button */
@Component({
    selector: 'button[hc-button], button[hc-icon-button]',
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
    private _style: string;
    private previousStyle: string;

    /**
     * @deprecated
     * @description Use `buttonStyle` instead
     * */
    @Input()
    get color(): string {
        return this.buttonStyle;
    }

    set color(btnStyle: string) {
        this.buttonStyle = btnStyle;
    }

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'` */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }

    set buttonStyle(btnStyle: string) {
        validateStyleInput(btnStyle);
        this.setHostStyle(btnStyle);
        this.previousStyle = this._style;
        this._style = btnStyle;
    }

    /** Whether the control is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = parseBooleanAttribute(isDisabled);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.buttonStyle = 'primary';
        this.previousStyle = this.buttonStyle;

        for (const attr of buttonAttributes) {
            if (elementRef.nativeElement.hasAttribute(attr)) {
                renderer.addClass(elementRef.nativeElement, attr);
            }
        }
    }

    /** Used to give focus to the button */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    private setHostStyle(style: string) {
        if (this.previousStyle !== style) {
            if (this.previousStyle) {
                this.renderer.removeClass(this.elementRef.nativeElement, this._styleClass(this.previousStyle));
            }
            this.renderer.addClass(this.elementRef.nativeElement, this._styleClass(style));
        }
    }

    private _styleClass(style: string): string {
        return `hc-${style}`;
    }
}
