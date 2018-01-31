import { NgModule } from '@angular/core';
import { PopoverDemoComponent } from './popover-demo/popover-demo.component';
import { CommonModule } from '@angular/common';
import { PopoverContentComponent } from './popoverContent.component';
import { PopoverDirective } from './popover.directive';

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