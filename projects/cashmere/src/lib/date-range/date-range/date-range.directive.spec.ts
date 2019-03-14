import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, Component} from '@angular/core';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRangeDirective} from './date-range.directive';
import {DateRangeOptions} from '../model/model';
import {By} from '@angular/platform-browser';

class MockOverlayService {
    open = jasmine.createSpy('open');
}

@Component({
    template: `
        <button hcDateRange [options]="options">Click Me</button>
    `
})
class TestComponent {
    options: DateRangeOptions;
    constructor() {
        const today: Date = new Date();
        const fromDate: Date = new Date(today.setDate(today.getDate() - 7));
        const toDate: Date = new Date();
        this.options = {
            presets: [],
            format: 'mediumDate',
            applyLabel: 'Submit'
        };
    }
}

describe('DateRangeDirective', () => {
    let component: TestComponent;
    let directive: DateRangeDirective;
    let fixture: ComponentFixture<TestComponent>;
    let overlay: MockOverlayService;

    beforeEach(async(() => {
        overlay = new MockOverlayService();

        TestBed.configureTestingModule({
            declarations: [TestComponent, DateRangeDirective],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(DateRangeDirective, {
                set: {
                    providers: [{provide: CalendarOverlayService, useValue: overlay}, ConfigStoreService]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        const el = fixture.debugElement.query(By.directive(DateRangeDirective));
        fixture.detectChanges();
        directive = el.injector.get(DateRangeDirective);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should set options in config', () => {
        expect(directive.configStoreService.dateRangeOptions$).toBeTruthy();
    });

    it('should reset dates as per input', () => {
        // tslint:disable no-shadowed-variable
        const today = new Date();
        const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const resetRange = {fromDate: currMonthStart, toDate: currMonthEnd};
        directive.selectedDate = resetRange;
        directive.selectedDateRangeChanged.subscribe(range => {
            expect(range.fromDate).toEqual(resetRange.fromDate);
            expect(range.toDate).toEqual(resetRange.toDate);
        });
    });

    it('should open modal when clicked', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(overlay.open).toHaveBeenCalled();
    });
});
