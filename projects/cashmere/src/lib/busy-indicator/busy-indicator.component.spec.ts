import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusyIndicatorComponent} from './busy-indicator.component';
import {ProgressIndicatorsModule} from '../progress-indicators';

describe('BusyIndicatorComponent', () => {
    let component: BusyIndicatorComponent;
    let fixture: ComponentFixture<BusyIndicatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ProgressIndicatorsModule],
            declarations: [BusyIndicatorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BusyIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
