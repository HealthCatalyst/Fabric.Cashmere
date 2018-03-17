import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorComponent } from './anchor.component';
import { ButtonItemDirective, SplitButtonComponent } from './split-button';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule
    ],
    declarations: [
        AnchorComponent,
        ButtonComponent,
        ButtonItemDirective,
        SplitButtonComponent
    ],
    exports: [
        AnchorComponent,
        ButtonComponent,
        ButtonItemDirective,
        SplitButtonComponent
    ]
})
export class ButtonModule {
}
