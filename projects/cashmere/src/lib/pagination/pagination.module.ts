import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button/button.module';
import {SelectModule} from '../select/select.module';
import {IconModule} from '../icon/icon.module';
import {PaginationComponent} from './pagination.component';
import {LoadMorePaginationComponent} from './load-more-pagination.component';
import {BasePaginationComponent} from './base-pagination';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, SelectModule, ReactiveFormsModule],
    declarations: [PaginationComponent, LoadMorePaginationComponent, BasePaginationComponent],
    exports: [PaginationComponent, LoadMorePaginationComponent, BasePaginationComponent]
})
export class PaginationModule {}
