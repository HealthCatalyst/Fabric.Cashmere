import { Component, Input } from '@angular/core';
import { ActiveModal } from './active-modal';

@Component({
    selector: 'hc-modal-header',
    template: `<div class="hc-modal-header">
                   <ng-content></ng-content>
                   <button *ngIf="showCloseButton" class="hc-modal-close-button" (click)="dismissModal()">&times;</button>
               </div>`
})
export class ModalHeaderComponent {

    @Input() showCloseButton: boolean = true;
    @Input() dismiss: () => void;

    constructor(private activeModal: ActiveModal) { }

    dismissModal(): void {
        this.dismiss ? this.dismiss() : this.activeModal.dismiss();
    }
}
