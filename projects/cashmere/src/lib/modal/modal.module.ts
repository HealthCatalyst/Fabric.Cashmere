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
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule, DragDropModule, ButtonModule],
    declarations: [
        ModalOverlayComponent,
        ModalWindowComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalComponent,
        SimpleModalComponent
    ],
    exports: [ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent],
    providers: [ModalService]
})
export class ModalModule {}
