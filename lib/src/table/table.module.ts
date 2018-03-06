import { IconModule } from './../icon/icon.module';
import { ButtonModule } from './../button/button.module';
import { PaginatorComponent } from './paginator.component';
import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TableComponent, SortableComponent, PaginatorComponent],
    exports: [TableComponent, SortableComponent, PaginatorComponent],
    imports: [ButtonModule, CommonModule, IconModule]
})
export class TableModule { }
