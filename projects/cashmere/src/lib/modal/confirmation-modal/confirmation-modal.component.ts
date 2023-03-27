import { Component, OnInit } from '@angular/core';
import { ActiveModal } from '../active-modal';
import { ConfirmationOptions } from './confirmation-modal-options.model';

@Component({
    selector: 'hc-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
    public options: ConfirmationOptions;
    constructor(private activeModal: ActiveModal) {}

    ngOnInit(): void {
        this.options = this.activeModal.data;
    }

    cancel(): void {
        this.activeModal.close(false);
    }

    confirm(): void {
        this.activeModal.close(true);
    }
}
