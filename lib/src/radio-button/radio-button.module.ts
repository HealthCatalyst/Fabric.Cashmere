import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent, RadioGroupDirective } from './radio-button.component';
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        RadioButtonComponent,
        RadioGroupDirective
    ],
    declarations: [
        RadioButtonComponent,
        RadioGroupDirective
    ],
    providers: []
})
export class RadioButtonModule {
}
