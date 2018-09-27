import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckboxComponent} from './checkbox.component';
import {HcCheckboxRequiredValidatorDirective} from './checkbox-required.directive';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [CheckboxComponent, HcCheckboxRequiredValidatorDirective],
    declarations: [CheckboxComponent, HcCheckboxRequiredValidatorDirective]
})
export class CheckboxModule {}
