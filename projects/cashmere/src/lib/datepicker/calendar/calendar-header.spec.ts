import { Directionality } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HcNativeDateModule } from '../datetime/datetime.module';
import { DatepickerModule } from '../datepicker.module';
import { HcDatepickerIntl } from '../datepicker-intl';
import { CalendarComponent } from './calendar.component';
import { JAN, FEB, DEC } from '../utils/month-constants';
import { yearsPerPage } from '../multi-year-view/multi-year-view.component';

// tslint:disable:no-non-null-assertion
// tslint:disable:component-class-suffix
describe('HcCalendarHeader', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HcNativeDateModule, DatepickerModule],
            declarations: [
                // Test components.
                StandardCalendar
            ],
            providers: [HcDatepickerIntl, { provide: Directionality, useFactory: () => ({ value: 'ltr' }) }]
        });

        TestBed.compileComponents();
    }));

    describe('standard calendar', () => {
        let fixture: ComponentFixture<StandardCalendar>;
        let testComponent: StandardCalendar;
        let calendarElement: HTMLElement;
        let periodButton: HTMLElement;
        let prevButton: HTMLElement;
        let nextButton: HTMLElement;
        let calendarInstance: CalendarComponent;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardCalendar);
            fixture.detectChanges();

            const calendarDebugElement = fixture.debugElement.query(By.directive(CalendarComponent));
            calendarElement = calendarDebugElement.nativeElement;
            periodButton = calendarElement.querySelector('.hc-calendar-period-button') as HTMLElement;
            prevButton = calendarElement.querySelector('.hc-calendar-previous-button') as HTMLElement;
            nextButton = calendarElement.querySelector('.hc-calendar-next-button') as HTMLElement;

            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });

        it('should be in month view with specified month active', () => {
            expect(calendarInstance.currentView).toBe('month');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should toggle view when period clicked', () => {
            expect(calendarInstance.currentView).toBe('month');

            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('multi-year');

            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('month');
        });

        it('should go to next and previous month', () => {
            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2017, FEB, 28));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 28));
        });

        it('should go to previous and next year', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

            (calendarElement.querySelector('.hc-calendar-body-active') as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('year');

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2018, JAN, 31));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should go to previous and next multi-year range', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

            nextButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2017 + yearsPerPage, JAN, 31));

            prevButton.click();
            fixture.detectChanges();

            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
        });

        it('should go back to month view after selecting year and month', () => {
            periodButton.click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

            const yearCells = calendarElement.querySelectorAll('.hc-calendar-body-cell');
            (yearCells[0] as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('year');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, JAN, 31));

            const monthCells = calendarElement.querySelectorAll('.hc-calendar-body-cell');
            (monthCells[monthCells.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            expect(calendarInstance.currentView).toBe('month');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, DEC, 31));
            expect(testComponent.selected).toBeFalsy('no date should be selected yet');
        });
    });
});

@Component({
    template: `
        <hc-calendar
            [startAt]="startDate"
            [(selected)]="selected"
            (yearSelected)="selectedYear = $event"
            (monthSelected)="selectedMonth = $event"
        >
        </hc-calendar>
    `
})
class StandardCalendar {
    selected: Date;
    selectedYear: Date;
    selectedMonth: Date;
    startDate = new Date(2017, JAN, 31);
}
