import { ModalService } from './../../../../lib/src/modal/modal.service';
import { Component, TemplateRef } from '@angular/core';
import { ModalOptions, HcModal } from '../../../../lib/src/modal';
import { SubModalDemoComponent } from './sub-modal-demo.component';

@Component({
    selector: 'hc-modal-demo',
    templateUrl: './modal-demo.component.html'
})
export class ModalDemoComponent {
    lastModified: Date = new Date( document.lastModified );
    result: any;
    constructor(private modalService: ModalService) { }

    public open() {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        let subModal: HcModal<SubModalDemoComponent> = this.modalService.open(SubModalDemoComponent, options);
        subModal.result.subscribe(res => this.result = res);
    }

    public openTemplate(content: TemplateRef<any>) {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me (Template version)',
            size: 'lg'
        };
        this.modalService.open(content, options)
    }
}
