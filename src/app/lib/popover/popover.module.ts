import { NgModule } from '@angular/core';
import { PopoverDirective } from 'app/lib/popover/popover.directive';
import { PopoverContentComponent } from 'app/lib/popover/popoverContent.component';
import { PopoverDemoComponent } from './popover-demo/popover-demo.component';
import { PopoverListItemComponent } from './popover-list-item/popover-list-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverDirective,
        PopoverContentComponent,
        PopoverListItemComponent
    ],
    exports: [
        PopoverDirective,
        PopoverContentComponent,
        PopoverListItemComponent
    ],
    entryComponents: [
        PopoverContentComponent
    ]
})
export class PopoverModule { }