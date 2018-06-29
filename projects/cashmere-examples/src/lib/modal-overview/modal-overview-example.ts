/* tslint:disable:no-use-before-declare */

import {ActiveModal, HcModal, ModalOptions, ModalService} from '@healthcatalyst/cashmere';
import {Component, TemplateRef} from '@angular/core';

/**
 * @title Modal overview
 */
@Component({
    selector: 'modal-overview-example',
    templateUrl: 'modal-overview-example.html'
})
export class ModalOverviewExample {
    result: any;

    constructor(private modalService: ModalService) {}

    open() {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        let subModal: HcModal<DialogOverviewExampleDialog> = this.modalService.open(DialogOverviewExampleDialog, options);
        subModal.result.subscribe(res => (this.result = res));
    }

    openTemplate(content: TemplateRef<any>) {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me (Template version)',
            size: 'lg'
        };
        this.modalService.open(content, options);
    }
}

@Component({
    selector: 'modal-overview-example-dialog',
    templateUrl: 'modal-overview-example-dialog.html'
})
export class DialogOverviewExampleDialog {
    constructor(public activeModal: ActiveModal) {}

    close() {
        this.activeModal.close();
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
