import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ButtonModule } from '../button/button.module';
import { ReleaseNotesService } from './release-notes.service';
import { ReleaseNotesModalComponent } from './release-notes-modal.component';
import { ModalModule } from '../modal';
import { AccordionModule } from '../accordion';

@NgModule({
    imports: [CommonModule, DragDropModule, ButtonModule, ModalModule, AccordionModule],
    declarations: [
        ReleaseNotesModalComponent
    ],
    exports: [ReleaseNotesModalComponent],
    providers: [ReleaseNotesService]
})
export class ReleaseNotesModalModule {}
