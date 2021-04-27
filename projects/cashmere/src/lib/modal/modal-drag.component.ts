import {Component, Input, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-modal-drag',
    template: `
        <div cdkDrag [cdkDragDisabled]="!disableDrag" cdkDragBoundary=".hc-modal-window">
            <div *ngIf="disableDrag" class="hc-modal-drag-handle" cdkDragHandle>
                <svg width="24px" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </div>
            <ng-content></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ModalDragComponent {
    @Input() disableDrag;

    @HostBinding('class.hc-modal-drag')
    _modalDragClass = true;
}
