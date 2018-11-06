import {IconModule} from '../icon/icon.module';
import {PopoverModule} from '../popover/popover.module';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NavbarModule} from './navbar.module';
import {ListModule} from '../list/list.module';
import {AppSwitcherService, APP_SWITCHER_SERVICE} from '../app-switcher';

@Component({
    template: `
    <hc-navbar brandIcon="./assets/TriFlame.svg" user="Christine K."
        [homeUri]="undefined" [fixedTop]="false">
    <hc-navbar-link [active]="true" uri="undefined" linkText="Home"></hc-navbar-link>
    <hc-navbar-mobile-menu appSwitcher="false">
        <hc-list>
            <hc-list-item routerLink="/home" routerLinkActive="active-link">
                <span hcListLine>Home</span>
            </hc-list-item>
        </hc-list>
    </hc-navbar-mobile-menu>
</hc-navbar>
    `
})
class TestAppComponent {}

describe('NavbarComponent', () => {
    let component: TestAppComponent;
    let fixture: ComponentFixture<TestAppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NavbarModule, ListModule],
            declarations: [TestAppComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create without IAppSwitcher', () => {
        expect(component).toBeTruthy();
    });
});
