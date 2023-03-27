import {NgModule} from '@angular/core';
import {ModalConfirmationOverviewExampleComponent} from './modal-confirmation-overview-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, ReactiveFormsModule],
    declarations: [ModalConfirmationOverviewExampleComponent],
    exports: [ModalConfirmationOverviewExampleComponent]
})
export class ModalConfirmationOverviewExampleModule {}
