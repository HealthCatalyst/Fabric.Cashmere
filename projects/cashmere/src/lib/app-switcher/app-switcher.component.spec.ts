import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopoverModule} from '../popover/popover.module';
import {PipesModule} from '../pipes/pipes.module';
import {APP_SWITCHER_SERVICE, MockAppSwitcherService} from './app-switcher-interfaces';

describe('AppSwitcherComponent', () => {
    let component: AppSwitcherComponent;
    let fixture: ComponentFixture<AppSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, PipesModule],
            declarations: [AppSwitcherComponent],
            providers: [
                {
                    provide: APP_SWITCHER_SERVICE,
                    useClass: MockAppSwitcherService
                }
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
