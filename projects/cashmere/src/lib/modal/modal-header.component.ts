import {Component, HostBinding} from '@angular/core';

@Component({
    selector: 'hc-modal-header',
    template: `<ng-content></ng-content>`
})
export class ModalHeaderComponent {
    @HostBinding('class.hc-modal-header') modalHeaderClass = true;
}
