import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent, RadioGroupDirective } from './radio-button.component';
import { RadioButtonNotifierService } from './radio-button-notifier.service';

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
    providers: [RadioButtonNotifierService]
})
export class RadioButtonModule {
}
