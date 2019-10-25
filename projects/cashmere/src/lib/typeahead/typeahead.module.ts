import {NgModule} from '@angular/core';
import {TypeaheadComponent} from './typeahead.component';
import {TypeaheadItemComponent} from './typeahead-item/typeahead-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {IconModule} from '../icon/icon.module';
import {PipesModule} from '../pipes/pipes.module';
import {CommonModule} from '@angular/common';
import {InputModule} from '../input/input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldModule, IconModule, InputModule, PipesModule],
    exports: [TypeaheadComponent, TypeaheadItemComponent],
    declarations: [TypeaheadComponent, TypeaheadItemComponent]
})
export class TypeaheadModule {
}
