import {Component, ElementRef, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal-body',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModalBodyComponent {
    @HostBinding('class.hc-modal-body')
    _modalBodyClass = true;

    constructor(public elementRef: ElementRef) {}
}
