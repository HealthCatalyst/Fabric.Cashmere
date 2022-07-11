import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HcModal } from './modal';
import { ModalOptions } from './modal-options';
import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';

@Component({
    template: `
        <hc-modal>
            <hc-modal-header>Modal Header Title</hc-modal-header>
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
                imports: [ModalModule],
                declarations: [ModalOverviewExampleModalComponent],
                providers: [ModalService, HcModal],
            })
            .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ModalOverviewExampleModalComponent] } })
            .compileComponents();
        }));

        beforeEach(() => (service = TestBed.inject(ModalService)));

        it('should open a modal without options', () => {
            mockModalRef = service.open( ModalOverviewExampleModalComponent);
            expect(mockModalRef).toBeTruthy();
        });

        it('should open a modal with options and set the size', () => {
            const options: ModalOptions = {size: 'lg'};
            mockModalRef = service.open( ModalOverviewExampleModalComponent, options);

            const size =  mockModalRef.window?.instance?._size;
            expect(size).toBe('lg');
        });

        it('should open a modal with options and set to resizable', () => {
            const options: ModalOptions = {isResizable: true};
            mockModalRef = service.open( ModalOverviewExampleModalComponent, options);

            const resizable =  mockModalRef.window?.instance?._isResizable;
            expect(resizable).toBe(true);
        });
    });
});
