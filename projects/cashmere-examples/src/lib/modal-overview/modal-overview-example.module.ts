import {NgModule} from '@angular/core';
import {ModalOverviewExampleComponent} from './modal-overview-example.component';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent],
    imports: [CommonModule, CashmereModule],
    entryComponents: [ModalOverviewExampleModalComponent]
})
export class ModalOverviewExampleModule {}
