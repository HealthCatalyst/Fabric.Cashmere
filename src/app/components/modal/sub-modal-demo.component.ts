import {ActiveModal, ModalService} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';

@Component({
    selector: 'hc-sub-modal-demo',
    template: `<hc-modal>
                   <hc-modal-header> Modal Header Title</hc-modal-header>
                   <hc-modal-body> Data: {{ activeModal.data }} </hc-modal-body>
                   <hc-modal-footer>
                      <button hc-button color="tertiary" (click)="cancel()"> Cancel </button>
                      <button hc-button color="primary" (click)="close()"> Ok </button>
                   </hc-modal-footer>
               </hc-modal>
    `
})
export class SubModalDemoComponent {
    constructor(private modalService: ModalService, public activeModal: ActiveModal) {}

    public close() {
        this.activeModal.close();
    }

    public cancel() {
        this.activeModal.dismiss();
    }
}
