import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiselectPaginationComponent} from './multiselect-pagination.component';
import { IconModule } from '../icon/icon.module';
import { FormFieldModule } from '../form-field/hc-form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, IconModule, FormsModule, FormFieldModule, ReactiveFormsModule],
    exports: [MultiselectPaginationComponent],
    declarations: [MultiselectPaginationComponent]
})
export class MultiselectPaginationModule {}
