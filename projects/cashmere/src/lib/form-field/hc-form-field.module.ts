import {NgModule} from '@angular/core';
import {HcFormFieldComponent} from './hc-form-field.component';
import {CommonModule} from '@angular/common';
import {HcErrorComponent} from './hc-error.component';
import {HcSuffixDirective} from './hc-suffix.directive';
import {HcPrefixDirective} from './hc-prefix.directive';
import {HcLabelComponent} from './hc-label.component';
import {HcLabelExtensionComponent} from './hc-label-ext.component';
import {HcFormDirective} from './hc-form.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        HcFormFieldComponent,
        HcErrorComponent,
        HcPrefixDirective,
        HcSuffixDirective,
        HcLabelComponent,
        HcLabelExtensionComponent,
        HcFormDirective
    ],
    exports: [
        HcFormFieldComponent,
        HcErrorComponent,
        HcPrefixDirective,
        HcSuffixDirective,
        HcLabelComponent,
        HcLabelExtensionComponent,
        HcFormDirective
    ]
})
export class FormFieldModule {}
