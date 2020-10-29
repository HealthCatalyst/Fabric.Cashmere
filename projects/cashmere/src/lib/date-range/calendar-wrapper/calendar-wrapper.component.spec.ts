import {async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import {CalendarWrapperComponent} from './calendar-wrapper.component';
import {ConfigStoreService} from '../services/config-store.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HcDatepickerInputEvent} from '../../datepicker/datepicker-input/datepicker-input.directive';
import {DateRangeOptions} from '../model/model';
import {InputModule} from '../../input/input.module';
import {FormFieldModule} from '../../form-field/hc-form-field.module';

describe('CalendarWrapperComponent', () => {
    let component: CalendarWrapperComponent;
    let fixture: ComponentFixture<CalendarWrapperComponent>;
    let configStoreService: ConfigStoreService;
    const newOptions: DateRangeOptions = {
        presets: [],
        format: 'mediumDate',
        applyLabel: 'Submit'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InputModule, FormFieldModule],
            declarations: [CalendarWrapperComponent],
            providers: [ConfigStoreService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        configStoreService = TestBed.inject(ConfigStoreService);
        configStoreService.updateDateRangeOptions(newOptions);
        fixture = TestBed.createComponent(CalendarWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit calendar date selection change', () => {
        component.selectedDateChange.subscribe(val => {
            expect(val instanceof Date).toBeTruthy();
        });
        component._onCalendarChange(new Date());
    });

    it('should emit input date selection change', fakeAsync(() => {
        component.selectedDateChange.subscribe(val => {
            expect(val instanceof Date).toBeTruthy();
        });
        component.datePickerInput = <any>{value: new Date()};
        const change: HcDatepickerInputEvent = new HcDatepickerInputEvent(component.datePickerInput, <any>null);
        component._onInputChange(change);
    }));
});
