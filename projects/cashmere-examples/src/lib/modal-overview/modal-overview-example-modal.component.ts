import {Component} from '@angular/core';
import {ActiveModal} from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-modal-overview-example-modal',
    templateUrl: 'modal-overview-example-modal.component.html',
    styleUrls: ['modal-overview-example-modal.component.scss'],
    standalone: false
})
export class ModalOverviewExampleModalComponent {
    constructor(public activeModal: ActiveModal) {}

    close(): void {
        this.activeModal.close();
    }

    cancel(): void {
        this.activeModal.dismiss();
    }
}
