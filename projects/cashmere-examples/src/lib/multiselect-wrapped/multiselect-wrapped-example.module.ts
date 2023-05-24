import {NgModule} from '@angular/core';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MultiselectWrappedExampleComponent} from './multiselect-wrapped-example.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgSelectModule, ReactiveFormsModule],
    declarations: [MultiselectWrappedExampleComponent],
    exports: [MultiselectWrappedExampleComponent]
})
export class MultiselectWrappedExampleModule {}
