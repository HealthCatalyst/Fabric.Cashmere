import {NgModule} from '@angular/core';
import {InputDirective} from './input.directive';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, FormFieldModule],
    declarations: [InputDirective],
    exports: [InputDirective]
})
export class InputModule {}
