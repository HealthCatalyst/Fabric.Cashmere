import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwitcherComponent } from './app-switcher.component';
import { PopoverModule } from '../popover/popover.module';
import { MockAppSwitcherService } from './app-switcher.service';
import { PipesModule } from '../pipes/pipes.module';

describe('AppSwitcherComponent', () => {
    let component: AppSwitcherComponent;
    let fixture: ComponentFixture<AppSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, PipesModule],
            declarations: [AppSwitcherComponent],
            providers: [
                {
                    provide: 'IAppSwitcherService',
                    useClass: MockAppSwitcherService
                }
            ]
        })
            .compileComponents();
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
