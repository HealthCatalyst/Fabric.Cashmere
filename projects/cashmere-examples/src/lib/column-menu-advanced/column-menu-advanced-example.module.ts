import {NgModule} from '@angular/core';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {ColumnMenuAdvancedExampleComponent} from './column-menu-advanced-example.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [CommonModule, CashmereModule, DragDropModule],
    declarations: [ColumnMenuAdvancedExampleComponent],
    exports: [ColumnMenuAdvancedExampleComponent]
})
export class ColumnMenuAdvancedExampleModule {}
