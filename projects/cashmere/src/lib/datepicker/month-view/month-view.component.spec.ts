import {Direction, Directionality} from '@angular/cdk/bidi';
import {Component} from '@angular/core';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HcNativeDateModule} from '../datetime/datetime.module';
import {MAR, JAN, DEC, NOV, FEB} from '../../utils/month-constants';
import {dispatchFakeEvent, dispatchEvent} from '../../utils/dispatch-events';
import {CalendarBodyComponent} from '../calendar-body/calendar-body.component';
import {MonthViewComponent} from './month-view.component';

describe('HcMonthView', () => {
    let dir: {value: Direction};

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HcNativeDateModule],
            declarations: [
                CalendarBodyComponent,
                MonthViewComponent,

                // Test components.
                StandardMonthView,
                MonthViewWithDateFilter,
                MonthViewWithDateClass
            ],
            providers: [{provide: Directionality, useFactory: () => (dir = {value: 'ltr'})}]
        });

        TestBed.compileComponents();
    }));

    describe('standard month view', () => {
        let fixture: ComponentFixture<StandardMonthView>;
        let testComponent: StandardMonthView;
        let monthViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardMonthView);
            fixture.detectChanges();

            const monthViewDebugElement = fixture.debugElement.query(By.directive(MonthViewComponent));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has 31 days', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cellEls.length).toBe(31);
        });

        it('shows selected date if in same month', () => {
            const selectedEl = monthViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl?.innerHTML.trim()).toBe('10');
        });

        it('does not show selected date if in different month', () => {
            testComponent.selected = new Date(2017, MAR, 10);
            fixture.detectChanges();

            const selectedEl = monthViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = monthViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl?.innerHTML.trim()).toBe('31');
        });

        it('should mark active date', () => {
            const cellEls = monthViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect((cellEls[4] as HTMLElement).innerText.trim()).toBe('5');
            expect(cellEls[4].classList).toContain('hc-calendar-body-active');
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardMonthView;

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.hc-calendar-body') as HTMLElement;
                    expect(calendarBodyEl).not.toBeNull();
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 5);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement date on left arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 4));

                    calendarInstance.date = new Date(2017, JAN, 1);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 31));
                });

                it('should increment date on left arrow press in rtl', () => {
                    dir.value = 'rtl';

                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 6));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 7));
                });

                it('should increment date on right arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 6));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 7));
                });

                it('should decrement date on right arrow press in rtl', () => {
                    dir.value = 'rtl';

                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 4));

                    calendarInstance.date = new Date(2017, JAN, 1);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 31));
                });

                it('should go up a row on up arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 29));

                    calendarInstance.date = new Date(2017, JAN, 7);
                    fixture.detectChanges();

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 31));
                });

                it('should go down a row on down arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 12));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 19));
                });

                it('should go to beginning of the month on home press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 1));
                });

                it('should go to end of the month on end press', () => {
                    calendarInstance.date = new Date(2017, JAN, 10);

                    let keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 31));

                    keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 31));
                });

                it('should go back one month on page up press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, NOV, 5));
                });

                it('should go forward one month on page down press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 5));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 5));
                });

                it('should select active date on enter', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(testComponent.selected).toEqual(new Date(2017, JAN, 10));

                    keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(testComponent.selected).toEqual(new Date(2017, JAN, 4));
                });

                it('should select active date on space', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(testComponent.selected).toEqual(new Date(2017, JAN, 10));

                    keyEvent = new KeyboardEvent('keydown', { key: ' ' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(testComponent.selected).toEqual(new Date(2017, JAN, 4));
                });
            });
        });
    });

    describe('month view with date filter', () => {
        let fixture: ComponentFixture<MonthViewWithDateFilter>;
        let monthViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthViewWithDateFilter);
            fixture.detectChanges();

            const monthViewDebugElement = fixture.debugElement.query(By.directive(MonthViewComponent));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
        });

        it('should disable filtered dates', () => {
            const cells = monthViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cells[0].classList).toContain('hc-calendar-body-disabled');
            expect(cells[1].classList).not.toContain('hc-calendar-body-disabled');
        });
    });

    describe('month view with custom date classes', () => {
        let fixture: ComponentFixture<MonthViewWithDateClass>;
        let monthViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthViewWithDateClass);
            fixture.detectChanges();

            const monthViewDebugElement = fixture.debugElement.query(By.directive(MonthViewComponent));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
        });

        it('should be able to add a custom class to some dates', () => {
            const cells = monthViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cells[0].classList).not.toContain('even');
            expect(cells[1].classList).toContain('even');
        });
    });
});

@Component({
    template: `
        <hc-month-view [(activeDate)]="date" [(selected)]="selected"></hc-month-view>
    `,
    standalone: false
})
class StandardMonthView {
    date = new Date(2017, JAN, 5);
    selected = new Date(2017, JAN, 10);
}

@Component({
    template: `
        <hc-month-view [activeDate]="activeDate" [dateFilter]="dateFilter"></hc-month-view>
    `,
    standalone: false
})
class MonthViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);
    dateFilter(date: Date) {
        return date.getDate() % 2 === 0;
    }
}

@Component({
    template: `
        <hc-month-view [activeDate]="activeDate" [dateClass]="dateClass"></hc-month-view>
    `,
    standalone: false
})
class MonthViewWithDateClass {
    activeDate = new Date(2017, JAN, 1);
    dateClass(date: Date) {
        return date.getDate() % 2 === 0 ? 'even' : undefined;
    }
}
