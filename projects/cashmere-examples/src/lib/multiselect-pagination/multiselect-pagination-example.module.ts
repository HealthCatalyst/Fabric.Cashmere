import {NgModule} from '@angular/core';
import {MultiselectPaginationExampleComponent} from './multiselect-pagination-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IPaginatorState } from 'projects/cashmere/src/lib/multiselect/multiselect-pagination.component';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgSelectModule, ReactiveFormsModule],
    declarations: [MultiselectPaginationExampleComponent],
    exports: [MultiselectPaginationExampleComponent]
})

export class MultiselectPaginationExampleModule {
    paginatorState: IPaginatorState = {
        skip: 0,
        take: 10,
        total: 30
    };
}
