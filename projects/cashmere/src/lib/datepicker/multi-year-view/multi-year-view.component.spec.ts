import {Direction, Directionality} from '@angular/cdk/bidi';
import {Component, ViewChild} from '@angular/core';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HcNativeDateModule} from '../datetime/datetime.module';
import {yearsPerPage, yearsPerRow, MultiYearViewComponent} from './multi-year-view.component';
import {JAN} from '../../utils/month-constants';
import {dispatchFakeEvent, dispatchEvent} from '../../utils/dispatch-events';
import {CalendarBodyComponent} from '../calendar-body/calendar-body.component';

describe('HcMultiYearView', () => {
    let dir: {value: Direction};

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HcNativeDateModule],
            declarations: [
                CalendarBodyComponent,
                MultiYearViewComponent,

                // Test components.
                StandardMultiYearView,
                MultiYearViewWithDateFilter
            ],
            providers: [{provide: Directionality, useFactory: () => (dir = {value: 'ltr'})}]
        });

        TestBed.compileComponents();
    }));

    describe('standard multi-year view', () => {
        let fixture: ComponentFixture<StandardMultiYearView>;
        let testComponent: StandardMultiYearView;
        let multiYearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardMultiYearView);
            fixture.detectChanges();

            const multiYearViewDebugElement = fixture.debugElement.query(By.directive(MultiYearViewComponent));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has correct number of years', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cellEls.length).toBe(yearsPerPage);
        });

        it('shows selected year if in same range', () => {
            const selectedEl = multiYearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('2020');
        });

        it('does not show selected year if in different range', () => {
            testComponent.selected = new Date(2040, JAN, 10);
            fixture.detectChanges();

            const selectedEl = multiYearViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = multiYearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('2039');
        });

        it('should emit the selected year on cell clicked', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');

            (cellEls[1] as HTMLElement).click();
            fixture.detectChanges();

            const normalizedYear: Date = fixture.componentInstance.selectedYear;
            expect(normalizedYear.getFullYear()).toEqual(2017);
        });

        it('should mark active date', () => {
            const cellEls = multiYearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect((cellEls[1] as HTMLElement).innerText.trim()).toBe('2017');
            expect(cellEls[1].classList).toContain('hc-calendar-body-active');
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardMultiYearView;

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.hc-calendar-body') as HTMLElement;
                    expect(calendarBodyEl).not.toBeNull();
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 1);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement year on left arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2015, JAN, 1));
                });

                it('should increment year on right arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2018, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2019, JAN, 1));
                });

                it('should go up a row on up arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 - yearsPerRow, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 - yearsPerRow * 2, JAN, 1));
                });

                it('should go down a row on down arrow press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 + yearsPerRow, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 + yearsPerRow * 2, JAN, 1));
                });

                it('should go to first year in current range on home press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));
                });

                it('should go to last year in current range on end press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2039, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'End' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2039, JAN, 1));
                });

                it('should go to same index in previous year range page up press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 - yearsPerPage, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageUp' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 - yearsPerPage * 2, JAN, 1));
                });

                it('should go to same index in next year range on page down press', () => {
                    let keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 + yearsPerPage, JAN, 1));

                    keyEvent = new KeyboardEvent('keydown', { key: 'PageDown' });
                    dispatchEvent(calendarBodyEl, keyEvent);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017 + yearsPerPage * 2, JAN, 1));
                });
            });
        });
    });

    describe('multi year view with date filter', () => {
        let fixture: ComponentFixture<MultiYearViewWithDateFilter>;
        let multiYearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(MultiYearViewWithDateFilter);
            fixture.detectChanges();

            const multiYearViewDebugElement = fixture.debugElement.query(By.directive(MultiYearViewComponent));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
        });

        it('should disablex years with no enabled days', () => {
            const cells = multiYearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cells[0].classList).not.toContain('hc-calendar-body-disabled');
            expect(cells[1].classList).toContain('hc-calendar-body-disabled');
        });
    });
});

@Component({
    template: `
        <hc-multi-year-view [(activeDate)]="date" [(selected)]="selected" (yearSelected)="selectedYear = $event"></hc-multi-year-view>
    `
})
class StandardMultiYearView {
    date = new Date(2017, JAN, 1);
    selected = new Date(2020, JAN, 1);
    selectedYear: Date;

    @ViewChild(MultiYearViewComponent)
    multiYearView: MultiYearViewComponent;
}

@Component({
    template: `
        <hc-multi-year-view [activeDate]="activeDate" [dateFilter]="dateFilter"></hc-multi-year-view>
    `
})
class MultiYearViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);
    dateFilter(date: Date) {
        return date.getFullYear() !== 2017;
    }
}
