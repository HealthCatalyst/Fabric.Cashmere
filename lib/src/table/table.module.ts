import { ButtonModule } from './../button/button.module';
import { PaginatorComponent } from './paginator.component';
import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { SortableComponent } from './sortable.component';

@NgModule({
    declarations: [TableComponent, SortableComponent, PaginatorComponent],
    exports: [TableComponent, SortableComponent, PaginatorComponent],
    imports: [ButtonModule]
})
export class TableModule { }
