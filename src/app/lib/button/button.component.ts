/* tslint:disable:component-selector */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

export function throwErrorForInvalidButtonColor() {
    throw new Error('Unsupported color input value');
}

type ButtonColor = 'primary' | 'primary-alt1' | 'primary-alt2' | 'primary-alt3' | 'secondary' | 'tertiary';

@Component({
    selector: 'button[hc-button], a[hc-button]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {
    private supportedColors = ['primary', 'primary-alt1', 'primary-alt2', 'primary-alt3', 'secondary', 'tertiary'];

    @Input() color: ButtonColor = 'primary';

    constructor(private elementRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const color = changes['color'];
        if (color) {
            if (!this.supportedColors.includes(color.currentValue)) {
                throwErrorForInvalidButtonColor();
            }
            this.changeButtonColor(color.previousValue, color.currentValue);
        }
    }

    private changeButtonColor(previousColor, newColor): void {
        if (previousColor) {
            this.renderer.removeClass(this.elementRef.nativeElement, previousColor);
        }
        this.renderer.addClass(this.elementRef.nativeElement, newColor);
    }
}
