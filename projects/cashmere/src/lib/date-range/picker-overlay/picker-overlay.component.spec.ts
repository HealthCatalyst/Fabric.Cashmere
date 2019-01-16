import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RangeStoreService, DATE } from '../services/range-store.service';
import { ConfigStoreService } from '../services/config-store.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { PickerOverlayComponent } from './picker-overlay.component';

class MockOverlayRef {
    dispose() {}
}

describe('RangeComponent', () => {
    let component: PickerOverlayComponent;
    let fixture: ComponentFixture<PickerOverlayComponent>;
    let configStoreService: ConfigStoreService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PickerOverlayComponent],
            imports: [BrowserAnimationsModule],
            providers: [
                { provide: DATE, useValue: new Date() },
                { provide: OverlayRef, useClass: MockOverlayRef },
                RangeStoreService,
                ConfigStoreService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        configStoreService = TestBed.get(ConfigStoreService);
        configStoreService.DateRangeOptions = {
            presets: [],
            format: 'mediumDate',
            range: { fromDate: new Date(), toDate: new Date() },
            applyLabel: 'Submit'
        };
        fixture = TestBed.createComponent(PickerOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
