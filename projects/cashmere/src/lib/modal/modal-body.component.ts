import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'hc-modal-body',
    template: `<ng-content></ng-content>`
})
export class ModalBodyComponent {
    @HostBinding('class.hc-modal-body') _modalBodyClass = true;
}
