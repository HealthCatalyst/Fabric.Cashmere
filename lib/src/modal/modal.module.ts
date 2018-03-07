import { ModalFooterComponent } from './modal-footer.component';
import { ModalWindowComponent } from './modal-window.component';
import { ModalOverlayComponent } from './modal-overlay.component';
import { ModalService } from './modal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveModal } from './active-modal';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalComponent } from './modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ModalOverlayComponent,
        ModalWindowComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalComponent
    ],
    entryComponents: [ModalOverlayComponent, ModalWindowComponent],
    exports: [ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent],
    providers: [ModalService, ActiveModal]
})
export class ModalModule {}
