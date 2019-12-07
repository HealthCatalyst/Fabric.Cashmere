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
        let radioDebugElement = fixture.debugElement.query(By.directive(RadioButtonComponent));
        expect(radioDebugElement.componentInstance.checked).toBe(false);

        component._updateFromDate(new Date(2010, 1, 1));
        component._updateToDate(new Date(2010, 1, 2));
        fixture.detectChanges();

        expect(radioDebugElement.componentInstance.checked).toBe(true);
    });

    describe('fromMaxDate', () => {
        it('should be undefined if toDate and fromMinMax.toDate are null', async(() => {
            return component._fromMaxDate
                .pipe(
                    tap((fromDate: Date | undefined) => {
                        expect(fromDate).toBeUndefined();
                    })
                )
                .subscribe();
        }));

        it('should be toDate if it is less than fromMinMax.toDate', async(() => {
            component._toDate = new Date(2010, 1, 1);
            const toDate = new Date(2010, 2, 1);
            configStoreService.updateDateRangeOptions({
                fromMinMax: {
                    toDate
                }
            });
            return component._fromMaxDate
                .pipe(
                    tap((fromDate: Date | undefined) => {
                        expect(fromDate).toEqual(component._toDate);
                    })
                )
                .subscribe();
        }));

        it('should be fromMinMax.toDate if it is less than toDate', async(() => {
            component._toDate = new Date(2010, 2, 1);
            const toDate = new Date(2010, 1, 1);
            configStoreService.updateDateRangeOptions({
                fromMinMax: {
                    toDate
                }
            });
            return component._fromMaxDate
                .pipe(
                    tap((fromDate: Date | undefined) => {
                        expect(fromDate).toEqual(toDate);
                    })
                )
                .subscribe();
        }));

        it('should default toDate when no fromMinMax.toDate is set', async(() => {
            component._toDate = new Date(2010, 1, 1);
            return component._fromMaxDate
                .pipe(
                    tap((fromDate: Date | undefined) => {
                        expect(fromDate).toEqual(component._toDate);
                    })
                )
                .subscribe();
        }));

        it('should be equal to fromMinMax.toDate', async(() => {
            component._toDate = undefined;
            const toDate = new Date(2011, 1, 1);
            configStoreService.updateDateRangeOptions({
                fromMinMax: {
                    toDate
                }
            });
            return component._fromMaxDate
                .pipe(
                    tap((fromDate: Date | undefined) => {
                        expect(fromDate).toEqual(toDate);
                    })
                )
                .subscribe();
        }));
    });

    describe('ToMinDate', () => {
        it('should be undefined if fromDate and toMinMax.fromDate are null', async(() => {
            return component._ToMinDate
                .pipe(
                    tap((toDate: Date | undefined) => {
                        expect(toDate).toBeUndefined();
                    })
                )
                .subscribe();
        }));

        it('should be fromDate if it is greater than toMinMax.fromDate', async(() => {
            component._fromDate = new Date(2010, 2, 1);
            const fromDate = new Date(2010, 1, 1);
            configStoreService.updateDateRangeOptions({
                toMinMax: {
                    fromDate
                }
            });
            return component._ToMinDate
                .pipe(
                    tap((toDate: Date | undefined) => {
                        expect(toDate).toEqual(component._fromDate);
                    })
                )
                .subscribe();
        }));

        it('should be toMinMax.fromDate if it is greater than fromDate', async(() => {
            component._fromDate = new Date(2010, 2, 1);
            const fromDate = new Date(2010, 1, 1);
            configStoreService.updateDateRangeOptions({
                toMinMax: {
                    fromDate
                }
            });
            return component._ToMinDate
                .pipe(
                    tap((toDate: Date | undefined) => {
                        expect(toDate).toEqual(component._fromDate);
                    })
                )
                .subscribe();
        }));

        it('should default fromDate when no toMinMax.fromDate is set', async(() => {
            component._fromDate = new Date(2010, 1, 1);
            return component._ToMinDate.pipe(
                tap((toDate: Date | undefined) => {
                    expect(toDate).toEqual(component._toDate);
                })
            );
        }));

        it('should be equal to toMinMax.fromDate', async(() => {
            component._toDate = undefined;
            const fromDate = new Date(2011, 1, 1);
            configStoreService.updateDateRangeOptions({
                toMinMax: {
                    fromDate
                }
            });
            return component._ToMinDate.pipe(
                tap((toDate: Date | undefined) => {
                    expect(toDate).toEqual(toDate);
                })
            );
        }));
    });
});
