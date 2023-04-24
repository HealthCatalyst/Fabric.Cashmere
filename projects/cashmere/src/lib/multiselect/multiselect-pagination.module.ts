import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiselectPaginationComponent} from './multiselect-pagination.component';
import { IconModule } from '../icon/icon.module';
import { FormFieldModule } from '../form-field/hc-form-field.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, IconModule, FormsModule, FormFieldModule, NgSelectModule, ReactiveFormsModule],
    exports: [MultiselectPaginationComponent],
    declarations: [MultiselectPaginationComponent]
})
export class MultiselectPaginationModule {}
