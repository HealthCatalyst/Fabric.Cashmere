import {NgModule} from '@angular/core';
import {SliderSingleExampleComponent} from './slider-single-example.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {NgxSliderModule} from 'ngx-slider-v2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, NgxSliderModule, ReactiveFormsModule],
    declarations: [SliderSingleExampleComponent],
    exports: [SliderSingleExampleComponent]
})
export class SliderSingleExampleModule {}
