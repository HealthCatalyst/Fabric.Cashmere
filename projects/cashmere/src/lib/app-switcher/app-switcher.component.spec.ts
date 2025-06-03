import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopModule} from '../pop/popover.module';
import {PipesModule} from '../pipes/pipes.module';
import {APP_SWITCHER_SERVICE, MockAppSwitcherService} from './app-switcher-interfaces';
import {By} from '@angular/platform-browser';
import {ProgressIndicatorsModule} from '../progress-indicators';
import {WorkTrackerService} from '../shared/work-tracker.service';

describe('AppSwitcherComponent', () => {
    let component: AppSwitcherComponent;
    let fixture: ComponentFixture<AppSwitcherComponent>;

    beforeEach(fakeAsync(() => {
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

    describe('detect current app', () => {
        it('should return empty string if the app is the current app', fakeAsync(() => {
            component.serviceName = 'MyApp';
            component.serviceVersion = 1;
            component.ngOnInit();
            tick();
            fixture.detectChanges();
            const anchorElements = fixture.debugElement.queryAll(By.css('.hc-app-switcher-link'));
            expect(anchorElements[0].nativeElement.getAttribute('href')).toEqual(null);
            expect(component.applications.length).toEqual(2);
            expect(component._linkIfNotMe(component.applications[0])).toBeNull();
        }));

        it('should return the link if the app is the current app', fakeAsync(() => {
            component.serviceName = 'MyApp';
            component.serviceVersion = 1;
            component.ngOnInit();
            tick();
            fixture.detectChanges();
            const anchorElements = fixture.debugElement.queryAll(By.css('.hc-app-switcher-link'));
            expect(anchorElements[1].nativeElement.getAttribute('href')).toEqual('http://anotherapp.com');
            expect(component.applications.length).toEqual(2);
            expect(component._linkIfNotMe(component.applications[1])).toEqual('http://anotherapp.com');
        }));
    });

    describe('load applications', () => {
        it('should set loadFail back to false after successful application load', () => {
            component.loadFailed = true;
            component.loadApplications();
            expect(component.loadFailed).toBe(false);
        });
    });
});
