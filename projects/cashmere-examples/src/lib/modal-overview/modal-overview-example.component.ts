import {HcModal, ModalOptions, ModalService} from '@healthcatalyst/cashmere';
import {Component, TemplateRef} from '@angular/core';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';

/**
 * @title Modal overview
 */
@Component({
    selector: 'hc-modal-overview-example',
    templateUrl: 'modal-overview-example.component.html'
})
export class ModalOverviewExampleComponent {
    result: any;

    constructor(private modalService: ModalService) {}

    open() {
        let options: ModalOptions = {
            data:
                'This is a size lg modal with isDraggable set to true. It places a drag handle in the top right corner which you can use to reposition the modal.',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg',
            isDraggable: true
        };
        let subModal: HcModal<ModalOverviewExampleModalComponent> = this.modalService.open(ModalOverviewExampleModalComponent, options);
        subModal.result.subscribe(res => (this.result = res));
    }

    openTemplate(content: TemplateRef<any>) {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me (Template version)',
            ignoreOverlayClick: true,
            isResizable: true
        };
        this.modalService.open(content, options);
    }
}
