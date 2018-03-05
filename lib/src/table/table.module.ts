import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { SortableComponent } from './sortable.component';

@NgModule({
    declarations: [TableComponent, SortableComponent],
    exports: [TableComponent, SortableComponent],
    imports: []
})
export class TableModule { }
