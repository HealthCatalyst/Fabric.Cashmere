import {NgModule} from '@angular/core';
import {MultiselectCustomTemplatesExampleComponent} from './multiselect-custom-templates-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgSelectModule, ReactiveFormsModule],
    declarations: [MultiselectCustomTemplatesExampleComponent],
    exports: [MultiselectCustomTemplatesExampleComponent],
    entryComponents: [MultiselectCustomTemplatesExampleComponent]
})
export class MultiselectCustomTemplatesExampleModule {}
