import {NgModule} from '@angular/core';
import {InputDirective} from './input.directive';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {CommonModule} from '@angular/common';
import { ClearInputComponent } from './clear-input.component';

@NgModule({
    imports: [CommonModule, FormFieldModule],
    declarations: [InputDirective, ClearInputComponent],
    exports: [InputDirective, ClearInputComponent]
})
export class InputModule {}
