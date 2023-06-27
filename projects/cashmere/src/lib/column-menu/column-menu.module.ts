import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColumnMenuComponent} from './column-menu.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { PopModule } from '../pop/popover.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IconModule } from '../icon';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CheckboxModule, PopModule, DragDropModule, IconModule],
    exports: [ColumnMenuComponent],
    declarations: [ColumnMenuComponent]
})
export class ColumnMenuModule {}
