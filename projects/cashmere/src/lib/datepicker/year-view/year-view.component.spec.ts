import {Direction, Directionality} from '@angular/cdk/bidi';
import {Component, ViewChild} from '@angular/core';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HcNativeDateModule} from '../datetime/datetime.module';
import {MAR, JUL, JUN, JAN, DEC, NOV, FEB, SEP, AUG, MAY, OCT} from '../../utils/month-constants';
import {dispatchFakeEvent, dispatchEvent} from '../../utils/dispatch-events';
import {CalendarBodyComponent} from '../calendar-body/calendar-body.component';
import {YearViewComponent} from './year-view.component';

describe('HcYearView', () => {
    let dir: {value: Direction};

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HcNativeDateModule],
            declarations: [
                CalendarBodyComponent,
                YearViewComponent,

                // Test components.
                StandardYearView,
                YearViewWithDateFilter
            ],
            providers: [{provide: Directionality, useFactory: () => (dir = {value: 'ltr'})}]
        });

        TestBed.compileComponents();
    }));

    describe('standard year view', () => {
        let fixture: ComponentFixture<StandardYearView>;
        let testComponent: StandardYearView;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardYearView);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(YearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has 12 months', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell')!;
            expect(cellEls.length).toBe(12);
        });

        it('shows selected month if in same year', () => {
            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('MAR');
        });

        it('does not show selected month if in different year', () => {
            testComponent.selected = new Date(2016, MAR, 10);
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('DEC');
        });

        it('should emit the selected month on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');

            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const normalizedMonth: Date = fixture.componentInstance.selectedMonth;
            expect(normalizedMonth.getMonth()).toEqual(11);
        });

        it('should mark active date', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect((cellEls[0] as HTMLElement).innerText.trim()).toBe('JAN');
            expect(cellEls[0].classList).toContain('hc-calendar-body-active');
        });

        it('should allow selection of month with less days than current active date', () => {
            testComponent.date = new Date(2017, JUL, 31);
            fixture.detectChanges();

            expect(testComponent.yearView._monthSelected(JUN));
            fixture.detectChanges();

            expect(testComponent.selected).toEqual(new Date(2017, JUN, 30));
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardYearView;

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.hc-calendar-body') as HTMLElement;
                    expect(calendarBodyEl).not.toBeNull();
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 5);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement month on left arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, NOV, 5));
                });

                it('should increment month on left arrow press in rtl', () => {
                    dir.value = 'rtl';

                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 5));
                });

                it('should increment month on right arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 5));
                });

                it('should decrement month on right arrow press in rtl', () => {
                    dir.value = 'rtl';

                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, NOV, 5));
                });

                it('should go up a row on up arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, SEP, 5));

                    calendarInstance.date = new Date(2017, JUL, 1);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 1));

                    calendarInstance.date = new Date(2017, DEC, 10);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, AUG, 10));
                });

                it('should go down a row on down arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAY, 5));

                    calendarInstance.date = new Date(2017, JUN, 1);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, OCT, 1));

                    calendarInstance.date = new Date(2017, SEP, 30);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2018, JAN, 30));
                });

                it('should go to first month of the year on home press', () => {
                    calendarInstance.date = new Date(2017, SEP, 30);
                    fixture.detectChanges();

                    let keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 30));

                    keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 30));
                });

                it('should go to last month of the year on end press', () => {
                    calendarInstance.date = new Date(2017, OCT, 31);
                    fixture.detectChanges();

                    let keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, DEC, 31));

                    keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, DEC, 31));
                });

                it('should go back one year on page up press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2015, FEB, 28));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2014, FEB, 28));
                });

                it('should go forward one year on page down press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 28));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2018, FEB, 28));
                });
            });
        });
    });

    describe('year view with date filter', () => {
        let fixture: ComponentFixture<YearViewWithDateFilter>;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(YearViewWithDateFilter);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(YearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
        });

        it('should disable months with no enabled days', () => {
            const cells = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cells[0].classList).not.toContain('hc-calendar-body-disabled');
            expect(cells[1].classList).toContain('hc-calendar-body-disabled');
        });
    });
});

@Component({
    template: `
        <hc-year-view [(activeDate)]="date" [(selected)]="selected" (monthSelected)="selectedMonth = $event"></hc-year-view>
    `
})
class StandardYearView {
    date = new Date(2017, JAN, 5);
    selected = new Date(2017, MAR, 10);
    selectedMonth: Date;

    @ViewChild(YearViewComponent)
    yearView: YearViewComponent;
}

@Component({
    template: `
        <hc-year-view [activeDate]="activeDate" [dateFilter]="dateFilter"></hc-year-view>
    `
})
class YearViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);
    dateFilter(date: Date) {
        if (date.getMonth() === JAN) {
            return date.getDate() === 10;
        }
        if (date.getMonth() === FEB) {
            return false;
        }
        return true;
    }
}
