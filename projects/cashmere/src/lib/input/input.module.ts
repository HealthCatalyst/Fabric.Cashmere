import {NgModule} from '@angular/core';
import {InputDirective} from './input.directive';
import {PhoneMaskDirective} from './phone-mask.directive';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, FormFieldModule],
    declarations: [InputDirective, PhoneMaskDirective],
    exports: [InputDirective, PhoneMaskDirective]
})
export class InputModule {}
