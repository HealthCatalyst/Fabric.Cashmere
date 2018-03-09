import { SelectableComponent } from './selectable.component';
import { IconModule } from './../icon/icon.module';
import { ButtonModule } from './../button/button.module';
import { PaginatorComponent } from './paginator.component';
import { GridComponent } from './grid.component';
import { NgModule } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [GridComponent, SortableComponent, PaginatorComponent, SelectableComponent],
    exports: [GridComponent, SortableComponent, PaginatorComponent, SelectableComponent],
    imports: [ButtonModule, CommonModule, IconModule]
})
export class GridModule { }
