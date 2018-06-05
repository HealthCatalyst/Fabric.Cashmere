import {NgModule} from '@angular/core';
import {HcFormFieldComponent} from './hc-form-field.component';
import {InputDirective} from './input.directive';
import {CommonModule} from '@angular/common';
import {HcErrorComponent} from './hc-error.component';
import {HcSuffixDirective} from './hc-suffix.directive';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcLabelComponent} from './hc-label.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HcFormFieldComponent, InputDirective, HcErrorComponent, HcPrefixDirective, HcSuffixDirective, HcLabelComponent],
    exports: [HcFormFieldComponent, InputDirective, HcErrorComponent, HcPrefixDirective, HcSuffixDirective, HcLabelComponent]
})
export class InputModule {}
