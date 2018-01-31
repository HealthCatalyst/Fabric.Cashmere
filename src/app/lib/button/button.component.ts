/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { anyToBoolean } from '../util';

export function throwErrorForInvalidButtonColor(unsupportedColor: string) {
    throw Error('Unsupported color input value: ' + unsupportedColor);
}

export type ButtonColor = 'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'tertiary';

@Component({
    selector: 'button[hc-button]',
    template: `
    <ng-content></ng-content>`,
    styleUrls: ['./button.component.scss'],
    host: {
        '[disabled]': 'disabled || null',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnChanges {
    private supportedColors = ['primary', 'primary-alt', 'destructive', 'neutral', 'secondary', 'tertiary'];
    protected _disabled = false;

    @Input() color: ButtonColor = 'primary';

    @HostBinding('class.hc-button')
    get buttonClass(): boolean {
        return true;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled) {
        this._disabled = anyToBoolean(isDisabled);
    }

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const color = changes['color'];
        if (color) {
            if (this.supportedColors.indexOf(color.currentValue) < 0) {
                throwErrorForInvalidButtonColor(color.currentValue);
            }
            this.changeColor(color.previousValue, color.currentValue);
        }
    }

    private changeColor(previousColor: ButtonColor, newColor: ButtonColor): void {
        if (previousColor) {
            this.renderer.removeClass(this.elementRef.nativeElement, `hc-button-${previousColor}`);
        }
        this.renderer.addClass(this.elementRef.nativeElement, `hc-button-${newColor}`);
    }
}
