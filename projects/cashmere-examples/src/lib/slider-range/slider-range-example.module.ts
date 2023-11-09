import {NgModule} from '@angular/core';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgxSliderModule} from 'ngx-slider-v2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SliderRangeExampleComponent} from './slider-range-example.component';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgxSliderModule, ReactiveFormsModule],
    declarations: [SliderRangeExampleComponent],
    exports: [SliderRangeExampleComponent]
})
export class SliderRangeExampleModule {}
