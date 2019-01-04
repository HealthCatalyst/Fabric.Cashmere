import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'hc-modal-footer',
    template: `<ng-content></ng-content>`
})
export class ModalFooterComponent {
    @HostBinding('class.hc-modal-footer')
    _modalFooterClass = true;
}
