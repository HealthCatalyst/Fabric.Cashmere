import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button.module';
import {SelectModule} from '../select/select.module';
import {IconModule} from '../icon/icon.module';
import {PaginationComponent} from './pagination.component';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, SelectModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
    providers: []
})
export class PaginationModule {}
