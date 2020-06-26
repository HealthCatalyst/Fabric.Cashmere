import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigStoreService} from '../services/config-store.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {PickerOverlayComponent} from './picker-overlay.component';
import {tap} from 'rxjs/operators';
import {By} from '@angular/platform-browser';
import {RadioButtonComponent} from '../../radio-button/radio';

class MockOverlayRef {
    dispose() {}
}

describe('RangeComponent', () => {
    let component: PickerOverlayComponent;
    let fixture: ComponentFixture<PickerOverlayComponent>;
    let configStoreService: ConfigStoreService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PickerOverlayComponent, RadioButtonComponent],
            imports: [BrowserAnimationsModule],
            providers: [{provide: OverlayRef, useClass: MockOverlayRef}, ConfigStoreService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        configStoreService = TestBed.get(ConfigStoreService);
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
        it('will not mark range invalid if one or both dates are missing', async(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(undefined);
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();

            component._updateFromDate(undefined);
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();

            component._updateFromDate(undefined);
            component._updateToDate(undefined);
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();
        }));

        it('will not mark range invalid if fromDate is before toDate', async(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(new Date(2010, 1, 2));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();
        }));

        it('will not mark range invalid if fromDate is equal to toDate', async(() => {
            component._updateFromDate(new Date(2010, 1, 1));
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeFalsy();
        }));

        it('will mark range invalid if fromDate is after toDate', async(() => {
            component._updateFromDate(new Date(2010, 1, 2));
            component._updateToDate(new Date(2010, 1, 1));
            component._validateRange();
            expect(component._rangeIsInvalid).toBeTruthy();
        }));
    });

});
