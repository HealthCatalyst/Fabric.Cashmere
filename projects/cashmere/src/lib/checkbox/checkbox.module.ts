import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckboxComponent, CheckboxGroup} from './checkbox.component';
import {HcCheckboxRequiredValidatorDirective} from './checkbox-required.directive';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [CheckboxComponent, HcCheckboxRequiredValidatorDirective, CheckboxGroup],
    declarations: [CheckboxComponent, HcCheckboxRequiredValidatorDirective, CheckboxGroup]
})
export class CheckboxModule {}
