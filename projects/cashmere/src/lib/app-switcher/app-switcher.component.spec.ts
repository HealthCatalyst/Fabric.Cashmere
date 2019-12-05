import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopModule} from '../pop/popover.module';
import {PipesModule} from '../pipes/pipes.module';
import {APP_SWITCHER_SERVICE, MockAppSwitcherService} from './app-switcher-interfaces';
import { ProgressIndicatorsModule } from '../progress-indicators';
import { WorkTrackerService } from '../picklist/services/work-tracker.service';


describe('AppSwitcherComponent', () => {
    let component: AppSwitcherComponent;
    let fixture: ComponentFixture<AppSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopModule, PipesModule, ProgressIndicatorsModule],
            declarations: [AppSwitcherComponent],
            providers: [
                {
                    provide: APP_SWITCHER_SERVICE,
                    useClass: MockAppSwitcherService
                },
                WorkTrackerService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
