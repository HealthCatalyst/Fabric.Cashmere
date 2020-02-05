import {Component, HostBinding, Input} from '@angular/core';
import {parseBooleanAttribute} from '../util';

@Component({
    selector: 'hc-modal-footer',
    template: `
        <ng-content></ng-content>
    `
})
export class ModalFooterComponent {
    @HostBinding('class.hc-modal-footer')
    _modalFooterClass = true;

    @HostBinding('class.hc-modal-tight')
    _modalTightClass = false;

     /** If true, removes the default padding of 15px 25px from this element. Defaults to `false` */
     @Input()
     get tight(): boolean {
         return this._modalTightClass;
     }
     set tight(value) {
        this._modalTightClass = parseBooleanAttribute(value);
    }
}
