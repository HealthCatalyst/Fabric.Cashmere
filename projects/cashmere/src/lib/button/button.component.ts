/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */

import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, ViewEncapsulation} from '@angular/core';
import {parseBooleanAttribute} from '../util';

export type ButtonStyle = 'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline';

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
    private _style: ButtonStyle;
    private previousStyle: ButtonStyle;

    /**
     * @deprecated
     * @description Use `buttonStyle` instead
     * */
    @Input()
    get color(): ButtonStyle {
        return this._style;
    }

    set color(btnColor: ButtonStyle) {
        this.setHostStyle(btnColor);
        this.previousStyle = this._style;
        this._style = btnColor;
    }

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'` */
    @Input()
    get buttonStyle(): ButtonStyle {
        return this._style;
    }

    set buttonStyle(btnStyle: ButtonStyle) {
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

    @HostBinding('class.hc-button')
    get _buttonClass(): boolean {
        return true;
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.buttonStyle = 'primary';
        this.previousStyle = this.buttonStyle;
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
