import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
    @HostBinding('class.hc-modal-content')
    _modalWrapperClass = true;
}
