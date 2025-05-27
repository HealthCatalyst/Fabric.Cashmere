import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal-header',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModalHeaderComponent {
    @HostBinding('class.hc-modal-header')
    _modalHeaderClass = true;
}
