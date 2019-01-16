import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateRangeDirective} from './date-range/date-range.component';
import {PickerOverlayComponent} from './picker-overlay/picker-overlay.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {CalendarWrapperComponent} from './calendar-wrapper/calendar-wrapper.component';
import {DATE} from './services/range-store.service';
import {FormsModule} from '@angular/forms';
import {HcNativeDateModule} from '../datepicker/datetime/datetime.module';
import {DatepickerModule} from '../datepicker/datepicker.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {InputModule} from '../input/input.module';
import {ButtonModule} from '../button/button.module';
import {RadioButtonModule} from '../radio-button/radio-button.module';

@NgModule({
    imports: [
        CommonModule,
        FormFieldModule,
        DatepickerModule,
        HcNativeDateModule,
        InputModule,
        ButtonModule,
        RadioButtonModule,
        OverlayModule,
        FormsModule
    ],
    declarations: [DateRangeDirective, CalendarWrapperComponent, PickerOverlayComponent],
    providers: [{provide: DATE, useValue: new Date()}],
    entryComponents: [PickerOverlayComponent],
    exports: [DateRangeDirective]
})
export class DateRangeModule {}
