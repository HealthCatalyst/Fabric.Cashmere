import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HcModal } from './modal';
import { ModalOptions } from './modal-options';
import { ModalService } from './modal.service';

@Component({
    template: `
        <hc-modal>
            <hc-modal-header>Modal Header Title</hc-modal-header>
            <hc-banner type="warning">
                <span hcBannerStamp>WARNING</span>
                You are about to export data which may include Protected Health Information (PHI)
            </hc-banner>
            <hc-modal-body>Data: {{ activeModal.data }}</hc-modal-body>
            <hc-modal-footer>
                <button hc-button buttonStyle="link" (click)="cancel()">Cancel</button>
                <button hc-button buttonStyle="primary" (click)="close()">OK</button>
            </hc-modal-footer>
        </hc-modal>
    `
})
class ModalOverviewExampleModalComponent {
    constructor(public modalRef: HcModal<ModalOverviewExampleModalComponent>) {}
}

describe('ModalService', () => {
    describe('when open is called', () => {
        let service: ModalService;
        let mockModalRef: HcModal<ModalOverviewExampleModalComponent>;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [],
                providers: [ModalService, HcModal]
            });
        }));

        beforeEach(() => (service = TestBed.inject(ModalService)));

        it('should open a modal without options', () => {
            mockModalRef = service.open( ModalOverviewExampleModalComponent);
            expect(mockModalRef).toBeTruthy();
        });

        it('should open a modal with options and set the size', () => {
            let options: ModalOptions = {size: 'lg'};
            mockModalRef = service.open( ModalOverviewExampleModalComponent, options);

            let div = mockModalRef.window?.location.nativeElement.querySelector('hc-modal');
            expect(div.className).toContain('hc-modal-lg');
        });

        it('should open a modal with options and set to resizable', () => {
            let options: ModalOptions = {isResizable: true};
            mockModalRef = service.open( ModalOverviewExampleModalComponent, options);

            let div = mockModalRef.window?.location.nativeElement.querySelector('hc-modal');
            expect(div.className).toContain('hc-modal-resizable');
        });
    });
});
