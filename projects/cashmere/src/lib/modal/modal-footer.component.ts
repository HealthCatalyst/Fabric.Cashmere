import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal-footer',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModalFooterComponent {
    @HostBinding('class.hc-modal-footer')
    _modalFooterClass = true;

    /** Removes all padding and displays the footer as a 15px high cap to the bottom of the modal.
     * Useful when you anticipate scrollable modal content to account for the rounded edges of the modal container.
     */
    @Input()
    @HostBinding('class.hc-modal-footer-minimal')
    minimal = false;
}
