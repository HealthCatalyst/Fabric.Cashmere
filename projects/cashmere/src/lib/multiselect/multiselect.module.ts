import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiselectComponent } from './multiselect.component';

@NgModule({
    imports: [CommonModule],
    exports: [MultiselectComponent],
    declarations: [MultiselectComponent]
})
export class MultiselectModule {}
