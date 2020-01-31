import {Component, HostBinding, Input} from '@angular/core';
import {parseBooleanAttribute} from '../util';

@Component({
    selector: 'hc-modal-header',
    template: `
        <ng-content></ng-content>
    `
})
export class ModalHeaderComponent {
    @HostBinding('class.hc-modal-header')
    _modalHeaderClass = true;

    @HostBinding('class.hc-modal-padding')
    _modalPaddingClass = true;

     /** If true, removes the default padding of 15px 25px from this element. Defaults to `false` */
     @Input()
     get tight(): boolean {
         return !this._modalPaddingClass;
     }
     set tight(value) {
        this._modalPaddingClass = !parseBooleanAttribute(value);
    }
}
