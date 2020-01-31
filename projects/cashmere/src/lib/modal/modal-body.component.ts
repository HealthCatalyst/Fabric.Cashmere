import {Component, HostBinding, Input} from '@angular/core';
import {parseBooleanAttribute} from '../util';

@Component({
    selector: 'hc-modal-body',
    template: `
        <ng-content></ng-content>
    `
})
export class ModalBodyComponent {
    @HostBinding('class.hc-modal-body')
    _modalBodyClass = true;

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
