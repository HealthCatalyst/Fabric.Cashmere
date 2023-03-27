import {NgModule} from '@angular/core';
import {ModalConfirmationSimpleExampleComponent} from './modal-confirmation-simple-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [ModalConfirmationSimpleExampleComponent],
    exports: [ModalConfirmationSimpleExampleComponent]
})
export class ModalConfirmationSimpleExampleModule {}
