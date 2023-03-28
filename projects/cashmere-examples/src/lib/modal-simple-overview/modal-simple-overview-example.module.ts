import {NgModule} from '@angular/core';
import {ModalSimpleOverviewExampleComponent} from './modal-simple-overview-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, ReactiveFormsModule],
    declarations: [ModalSimpleOverviewExampleComponent],
    exports: [ModalSimpleOverviewExampleComponent]
})
export class ModalSimpleOverviewExampleModule {}
