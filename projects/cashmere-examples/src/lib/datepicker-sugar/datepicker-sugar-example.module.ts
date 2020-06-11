import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PlatformModule} from '@angular/cdk/platform';
import {CommonModule} from '@angular/common';
import {NativeDateAdapter, DateAdapter} from '@healthcatalyst/cashmere';
import {DatepickerSugarExampleComponent} from './datepicker-sugar-example.component';
import {CashmereModule} from '../cashmere.module';
import * as sugar from 'sugar';

export class SugarDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        return sugar.Date.create(value);
    }
}

@NgModule({
    imports: [PlatformModule, CommonModule, CashmereModule, FormsModule],
    declarations: [DatepickerSugarExampleComponent],
    exports: [DatepickerSugarExampleComponent],
    providers: [{provide: DateAdapter, useClass: SugarDateAdapter}],
    entryComponents: [DatepickerSugarExampleComponent]
})
export class DatepickerSugarExampleModule {}
