import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockAppSwitcherService} from '../../app-switcher/app-switcher.service';
import {IconModule} from '../../icon/icon.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarMobileMenuComponent} from './navbar-mobile-menu.component';

describe('NavbarMobileMenuComponent', () => {
    let component: NavbarMobileMenuComponent;
    let fixture: ComponentFixture<NavbarMobileMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarMobileMenuComponent],
            imports: [IconModule, BrowserAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarMobileMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create without IAppSwitcherService', () => {
        expect(component).toBeTruthy();
    });

    describe('show', () => {
        it('should change the y position', () => {
            component.show();
            expect(component._yPos).toBe('0');
        });
    });

    describe('hide', () => {
        it('should change the y position', () => {
            component.hide();
            expect(component._yPos).toBe('-50');
        });
    });
});
