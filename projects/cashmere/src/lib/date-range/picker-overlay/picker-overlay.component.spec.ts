import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigStoreService} from '../services/config-store.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {PickerOverlayComponent} from './picker-overlay.component';
import {RadioButtonComponent} from '../../radio-button/radio';

class MockOverlayRef {
    dispose() {
        // do nothing
    }
}

describe('RangeComponent', () => {
    let component: PickerOverlayComponent;
    let fixture: ComponentFixture<PickerOverlayComponent>;
    let configStoreService: ConfigStoreService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PickerOverlayComponent, RadioButtonComponent],
            imports: [BrowserAnimationsModule],
            providers: [{provide: OverlayRef, useClass: MockOverlayRef}, ConfigStoreService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        configStoreService = TestBed.inject(ConfigStoreService);
        configStoreService.updateDateRangeOptions({
            presets: [
                {
                    presetLabel: 'Test preset',
                    range: {fromDate: new Date(2010, 1, 1), toDate: new Date(2010, 1, 2)}
                }
            ],
            format: 'mediumDate',
            applyLabel: 'Submit'
        });
        fixture = TestBed.createComponent(PickerOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should select a preset radio if the current dates match that preset's range", () => {
        expect(component._selectedPreset).toBeFalsy();

        component._updateFromDate(new Date(2010, 1, 1));
        component._updateToDate(new Date(2010, 1, 2));
        fixture.detectChanges();

        expect(component._selectedPreset).toBe(0);
    });

    describe('_validateRange', () => {
        it('will mark the range invalid if one or both dates are missing', waitForAsync(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(undefined);
            component._validateRange();
            expect(component._rangeIsInvalid).toBeTruthy();
            expect(component.__invalidRangeErrorMessage).toBe("End date cannot be blank.");

            component._updateFromDate(undefined);
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeTruthy();
            expect(component.__invalidRangeErrorMessage).toBe("Start date cannot be blank.");

            component._updateFromDate(undefined);
            component._updateToDate(undefined);
            component._validateRange();
            expect(component._rangeIsInvalid).toBeTruthy();
            expect(component.__invalidRangeErrorMessage).toBe("You must choose a date.");
        }));

        describe('_fromDateIsRequired == false', () => {
            beforeEach(() => {
                component._fromDateIsRequired = false;
            });

            it('will mark range valid if _toDate is not null', waitForAsync(() => {
                component._updateToDate(new Date(2010, 1, 1));
                component._validateRange();
                expect(component._rangeIsInvalid).toBeFalsy();
                expect(component.__invalidRangeErrorMessage).toBe(null);
            }));

            it('will mark range invalid if _toDate is null', waitForAsync(() => {
                component._validateRange();
                expect(component._rangeIsInvalid).toBeTruthy();
                expect(component.__invalidRangeErrorMessage).toBe("You must choose a date.");
            }));
        });

        describe('_toDateIsRequired == false', () => {
            beforeEach(() => {
                component._toDateIsRequired = false;
            });

            it('will mark range valid if _fromDate is not null', waitForAsync(() => {
                component._updateFromDate(new Date(2010, 1, 1));
                component._validateRange();
                expect(component._rangeIsInvalid).toBeFalsy();
                expect(component.__invalidRangeErrorMessage).toBe(null);
            }));

            it('will mark range invalid if _fromDate is null', waitForAsync(() => {
                component._validateRange();
                expect(component._rangeIsInvalid).toBeTruthy();
                expect(component.__invalidRangeErrorMessage).toBe("You must choose a date.");
            }));
        });

        it('will not mark range invalid if fromDate is before toDate', waitForAsync(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(new Date(2010, 1, 2));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();
        }));

        it('will not mark range invalid if fromDate is equal to toDate', waitForAsync(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();
        }));

        it('will mark range invalid if fromDate is after toDate', waitForAsync(() => {
            component._updateFromDate(new Date(2010, 1, 2));
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeTruthy();
            expect(component.__invalidRangeErrorMessage).toBe("Start date cannot be after End date.");
        }));
    });

});
