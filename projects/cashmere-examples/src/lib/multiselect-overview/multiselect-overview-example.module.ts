import {NgModule} from '@angular/core';
import {MultiselectOverviewExampleComponent} from './multiselect-overview-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, ReactiveFormsModule, NgSelectModule],
    declarations: [MultiselectOverviewExampleComponent],
    exports: [MultiselectOverviewExampleComponent]
})
export class MultiselectOverviewExampleModule {}
