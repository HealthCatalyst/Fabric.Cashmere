// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Renderer2, ViewEncapsulation} from '@angular/core';
import {ButtonComponent} from './button.component';

/* Cashmere button styled anchor */
@Component({
    selector: 'a[hc-button]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AnchorComponent extends ButtonComponent {
    @HostBinding('attr.aria-disabled')
    get _hostAriaDisabled(): string {
        return this.disabled ? this.disabled.toString() : 'false';
    }

    @HostBinding('attr.tabindex')
    get _hostTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    @HostBinding('style.pointer-events')
    get _handleClickEvents(): string {
        return this.disabled ? 'none' : 'auto';
    }

    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }
}
