import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
        it('should change the animation state', () => {
            expect(component._openState).toBe('closed');
            component.show();
            expect(component._openState).toBe('open');
        });
    });
});
