import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal-footer',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ModalFooterComponent {
    @HostBinding('class.hc-modal-footer')
    _modalFooterClass = true;
}
