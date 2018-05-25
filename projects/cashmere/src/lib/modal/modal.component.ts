import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'hc-modal',
    template: `<ng-content></ng-content>`
})
export class ModalComponent {
    @HostBinding('class.hc-modal-content') modalWrapperClass = true;
}
