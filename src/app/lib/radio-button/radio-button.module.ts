import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';
import { RadioButtonDemoComponent } from './radio-button-demo/radio-button-demo.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        RadioButtonComponent
    ],
    declarations: [
        RadioButtonComponent
    ]
})
export class RadioButtonModule {
}
