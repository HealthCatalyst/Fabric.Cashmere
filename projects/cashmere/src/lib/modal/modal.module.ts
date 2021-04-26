import {ModalFooterComponent} from './modal-footer.component';
import {ModalWindowComponent} from './modal-window.component';
import {ModalOverlayComponent} from './modal-overlay.component';
import {ModalService} from './modal.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalHeaderComponent} from './modal-header.component';
import {ModalBodyComponent} from './modal-body.component';
import {ModalComponent} from './modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModalDragComponent} from './modal-drag.component';

@NgModule({
    imports: [CommonModule, DragDropModule],
    declarations: [
        ModalOverlayComponent,
        ModalWindowComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalComponent,
        ModalDragComponent
    ],
    entryComponents: [ModalOverlayComponent, ModalWindowComponent],
    exports: [ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalDragComponent],
    providers: [ModalService]
})
export class ModalModule {}
