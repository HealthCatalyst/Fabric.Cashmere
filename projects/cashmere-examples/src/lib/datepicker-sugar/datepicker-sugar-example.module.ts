import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PlatformModule} from '@angular/cdk/platform';
import {CommonModule} from '@angular/common';
import createDate from 'sugar/date/internal/createDate';
import {NativeDateAdapter, DateAdapter} from '@healthcatalyst/cashmere';
import {DatepickerSugarExampleComponent} from './datepicker-sugar-example.component';
import {CashmereModule} from '../cashmere.module';

export class SugarDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        return createDate(value);
    }
}

@NgModule({
    imports: [PlatformModule, CommonModule, CashmereModule, FormsModule],
    declarations: [DatepickerSugarExampleComponent],
    providers: [{provide: DateAdapter, useClass: SugarDateAdapter}],
    entryComponents: [DatepickerSugarExampleComponent]
})
export class DatepickerSugarExampleModule {}
