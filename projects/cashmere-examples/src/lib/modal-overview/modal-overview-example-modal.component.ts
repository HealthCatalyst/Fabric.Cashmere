import {Component} from '@angular/core';
import {ActiveModal} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-modal-overview-example-modal',
    templateUrl: 'modal-overview-example-modal.component.html'
})
export class ModalOverviewExampleModalComponent {
    constructor(public activeModal: ActiveModal) {}

    close() {
        this.activeModal.close();
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
