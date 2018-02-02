import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AnchorComponent } from './anchor.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent,
        // AnchorComponent
    ],
    exports: [
        ButtonComponent,
        // AnchorComponent
    ]
})
export class ButtonModule {
}
