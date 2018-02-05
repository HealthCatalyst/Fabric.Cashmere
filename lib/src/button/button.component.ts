/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { anyToBoolean } from '../util';

const supportedColors = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'tertiary'];

export function validateButtonColor(btnColor: string) {
    if (supportedColors.indexOf(btnColor) < 0) {
        throw Error('Unsupported color input value: ' + btnColor);
    }
}

@Component({
    selector: 'button[hc-button]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button.component.scss'],
    host: {
        '[disabled]': 'disabled || null',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
    private _disabled = false;
    private _color: string;
    private previousColor: string;

    @Input()
    get color(): string {
        return this._color;
    }

    set color(btnColor: string) {
        validateButtonColor(btnColor);

        this.setHostColor(btnColor);
        this.previousColor = this._color;
        this._color = btnColor;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = anyToBoolean(isDisabled);
    }


    @HostBinding('class.hc-button')
    get buttonClass(): boolean {
        return true;
    }

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {
        this.color = 'primary';
        this.previousColor = this.color;
    }

    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    private setHostColor(color: string) {
        if (this.previousColor !== color) {
            console.log(`previous ${this.previousColor}, current ${color}`);
            if (this.previousColor) {
                this.renderer.removeClass(this.elementRef.nativeElement, this.colorClass(this.previousColor));
            }
            this.renderer.addClass(this.elementRef.nativeElement, this.colorClass(color));
        }
    }

    private colorClass(color: string): string {
        return `hc-${color}`;
    }
}
