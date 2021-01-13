import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, Component} from '@angular/core';
import {CalendarOverlayService} from '../services/calendar-overlay.service';
import {ConfigStoreService} from '../services/config-store.service';
import {DateRangeDirective} from './date-range.directive';
import {DateRangeOptions, DateRange} from '../model/model';
import {By} from '@angular/platform-browser';

class MockOverlayService {
    open = jasmine.createSpy('open');
}

@Component({
    template: `
        <button
            hcDateRange
            [selectedDate]="range"
            (selectedDateRangeChanged)="updateRange($event)"
            (selectedPresetChanged)="updatePreset($event)"
            [options]="options"
        >
            Click Me
        </button>
    `
})
class TestComponent {
    options: DateRangeOptions;
    range: number | DateRange = {fromDate: new Date(), toDate: new Date()};
    constructor() {
        this.options = {
            presets: [
                {
                    presetLabel: 'Preset One',
                    range: {fromDate: new Date(1900, 1, 1), toDate: new Date(1900, 1, 2)}
                },
                {
                    presetLabel: 'Preset Two',
                    range: {fromDate: new Date(2000, 1, 1), toDate: new Date(2000, 1, 2)}
                }
            ],
            format: 'mediumDate',
            applyLabel: 'Submit'
        };
    }
    updateRange(range: DateRange) {
        this.range = range;
    }
    updatePreset(index: number|DateRange) {}
}

describe('DateRangeDirective', () => {
    let component: TestComponent;
    let directive: DateRangeDirective;
    let fixture: ComponentFixture<TestComponent>;
    let overlay: MockOverlayService;

    beforeEach(waitForAsync(() => {
        overlay = new MockOverlayService();

        TestBed.configureTestingModule({
            declarations: [TestComponent, DateRangeDirective],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideDirective(DateRangeDirective, {
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

        spyOn(component, 'updateRange');
        component.range = resetRange;
        fixture.detectChanges();

        expect(component.updateRange).toHaveBeenCalledWith(resetRange);
    });

    it('should open modal when clicked', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(overlay.open).toHaveBeenCalled();
    });

    it('should set the selected preset from an index', () => {
        spyOn(component, 'updatePreset');
        component.range = 1;
        fixture.detectChanges();

        expect(component.updatePreset).toHaveBeenCalledWith(1);
    });
});
