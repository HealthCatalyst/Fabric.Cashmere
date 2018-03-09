import { CheckboxModule } from './../checkbox/checkbox.module';
import { SelectableComponent } from './selectable.component';
import { IconModule } from './../icon/icon.module';
import { ButtonModule } from './../button/button.module';
import { PaginatorComponent } from './paginator.component';
import { GridComponent } from './grid.component';
import { NgModule } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterCheckboxComponent } from './master-checkbox.component';

@NgModule({
    declarations: [GridComponent, SortableComponent, PaginatorComponent, SelectableComponent, MasterCheckboxComponent],
    exports: [GridComponent, SortableComponent, PaginatorComponent, SelectableComponent, MasterCheckboxComponent],
    imports: [ButtonModule, CommonModule, IconModule, CheckboxModule, FormsModule]
})
export class GridModule {}
