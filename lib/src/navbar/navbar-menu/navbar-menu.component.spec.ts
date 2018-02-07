import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockAppSwitcherService } from './../../app-switcher/app-switcher.service';
import { IconModule } from './../../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuComponent } from './navbar-menu.component';

describe('NavbarMenuComponent', () => {
    let component: NavbarMenuComponent;
    let fixture: ComponentFixture<NavbarMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarMenuComponent],
            imports: [IconModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: 'IAppSwitcherService',
                    useClass: MockAppSwitcherService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
