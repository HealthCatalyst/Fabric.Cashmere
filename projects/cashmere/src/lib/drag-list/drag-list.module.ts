import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragListComponent} from './drag-list.component';
import {IconModule} from '../icon/icon.module';
import {PopModule} from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, IconModule, PopModule],
    exports: [DragListComponent],
    declarations: [DragListComponent]
})
export class DragListModule {}
