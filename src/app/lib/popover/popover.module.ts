import { NgModule } from '@angular/core';
import { PopoverDirective } from 'app/lib/popover/popover.directive';
import { PopoverContentComponent } from 'app/lib/popover/popoverContent.component';
import { PopoverDemoComponent } from './popover-demo/popover-demo.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverDirective,
        PopoverContentComponent
    ],
    exports: [
        PopoverDirective,
        PopoverContentComponent
    ],
    entryComponents: [
        PopoverContentComponent
    ]
})
export class PopoverModule { }