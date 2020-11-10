import {NgModule} from '@angular/core';
import {ModalOverviewExampleComponent} from './modal-overview-example.component';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent],
    exports: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent],
    entryComponents: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent]
})
export class ModalOverviewExampleModule {}
