import {NgModule} from '@angular/core';
import {ModalSimpleExampleComponent} from './modal-simple-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [ModalSimpleExampleComponent],
    exports: [ModalSimpleExampleComponent]
})
export class ModalSimpleExampleModule {}
