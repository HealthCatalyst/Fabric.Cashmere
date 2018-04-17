/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480

import { Component, Input, ViewEncapsulation, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { parseBooleanAttribute } from '../util';

@Component({
    selector: 'input[hc-input]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class InputComponent {

    _highlight: boolean = false;

    @HostBinding('class.hc-input') hostClass = true;

    constructor( private elementRef: ElementRef, private renderer: Renderer2 ) { }

    @Input() get highlight(): boolean { return this._highlight; }

    set highlight(doHighlight) {
        let tempVal = parseBooleanAttribute(doHighlight);
        if ( tempVal && !this._highlight ) {
            this.renderer.addClass(this.elementRef.nativeElement, 'error-highlight');
        } else if ( !tempVal && this._highlight  ) {
            this.renderer.removeClass(this.elementRef.nativeElement, 'error-highlight');
        }
        this._highlight = tempVal;
    }
}
