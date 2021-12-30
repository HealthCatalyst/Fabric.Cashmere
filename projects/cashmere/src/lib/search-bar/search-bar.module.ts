import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchBarComponent} from './search-bar.component';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {InputModule} from '../input/input.module';

@NgModule({
    declarations: [SearchBarComponent],
    exports: [SearchBarComponent],
    imports: [CommonModule, FormFieldModule, InputModule],
    providers: []
})
export class SearchBarModule {}
