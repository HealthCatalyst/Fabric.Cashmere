import { NgModule } from '@angular/core';
import { PopoverDirective } from 'app/lib/popover/popover.directive';
import { PopoverContentComponent } from 'app/lib/popover/popoverContent.component';
import { PopoverDemoComponent } from './popover-demo/popover-demo.component';


@NgModule({
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