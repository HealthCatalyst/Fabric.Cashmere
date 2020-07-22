import {NgModule} from '@angular/core';
import {MultiselectEmbedCheckboxExampleComponent} from './multiselect-embed-checkbox-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgSelectModule, ReactiveFormsModule],
    declarations: [MultiselectEmbedCheckboxExampleComponent],
    exports: [MultiselectEmbedCheckboxExampleComponent],
    entryComponents: [MultiselectEmbedCheckboxExampleComponent]
})
export class MultiselectEmbedCheckboxExampleModule {}
