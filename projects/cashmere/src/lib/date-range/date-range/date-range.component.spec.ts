import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { CalendarOverlayService } from '../services/calendar-overlay.service';
import { RangeStoreService, DATE } from '../services/range-store.service';
import { ConfigStoreService } from '../services/config-store.service';
import { DatePipe } from '@angular/common';
import { DateRangeDirective } from './date-range.component';
import { DateRangeOptions } from '../model/model';
import { By } from '@angular/platform-browser';

class MockOverlayService {
    open = jasmine.createSpy('open');
}

@Component({
    template: `
        <button hc-date-range [options]="options">Click Me</button>
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
            range: { fromDate: fromDate, toDate: toDate },
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
        overlay  = new MockOverlayService();

        TestBed.configureTestingModule({
            declarations: [TestComponent, DateRangeDirective],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(DateRangeDirective, {
                set: {
                    providers: [
                        { provide: DATE, useValue: new Date() },
                        { provide: CalendarOverlayService, useValue: overlay },
                        RangeStoreService,
                        ConfigStoreService,
                        DatePipe
                    ]
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
        expect(directive.configStoreService.DateRangeOptions).toBeTruthy();
    });

    it('should set current date as per options', () => {
        const updateDateSpy = spyOn(directive.rangeStoreService, 'updateRange');
        directive.ngOnInit();
        expect(updateDateSpy).toHaveBeenCalledWith(directive.options.range.fromDate, directive.options.range.toDate);
    });

    it('should reset dates as per input', () => {
        // tslint:disable no-shadowed-variable
        const today = new Date();
        const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const resetRange = { fromDate: currMonthStart, toDate: currMonthEnd };
        directive.resetDates(resetRange);
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
