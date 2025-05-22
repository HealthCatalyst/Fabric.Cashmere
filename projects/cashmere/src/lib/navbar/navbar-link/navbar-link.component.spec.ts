import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarLinkComponent} from './navbar-link.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    selector: `hc-host-component`,
    template: `
        <hc-navbar-link></hc-navbar-link>
    `,
    standalone: false
})
class TestHostComponent {
    @ViewChild(NavbarLinkComponent)
    public navbarLinkComponent: NavbarLinkComponent;
}
describe('NavbarLinkComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([{ path: '', component: NavbarLinkComponent }], {})],
            declarations: [NavbarLinkComponent, TestHostComponent],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    });

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });
    it('should set inputs', () => {
        testHostComponent.navbarLinkComponent.uri = 'routerLink';
        testHostComponent.navbarLinkComponent.linkText = 'hello, I am a link';
        expect(testHostComponent.navbarLinkComponent.uri).toEqual('routerLink');
        expect(testHostComponent.navbarLinkComponent.linkText).toEqual('hello, I am a link');
        expect(testHostComponent.navbarLinkComponent.active).toBeFalsy();
        expect(testHostComponent.navbarLinkComponent.exact).toBeFalsy();
    });
    it('should set active and exact inputs', () => {
        testHostComponent.navbarLinkComponent.active = true;
        testHostComponent.navbarLinkComponent.exact = true;
        expect(testHostComponent.navbarLinkComponent.active).toBeTruthy();
        expect(testHostComponent.navbarLinkComponent.exact).toBeTruthy();
    });
    it('should set _hidden to true when hide() is called', () => {
        spyOn(testHostComponent.navbarLinkComponent['ref'], 'detectChanges');
        testHostComponent.navbarLinkComponent.hide();
        expect(testHostComponent.navbarLinkComponent._hidden).toBeTruthy();
        expect(testHostComponent.navbarLinkComponent['ref'].detectChanges).toHaveBeenCalled();
    });
    it('should set _hidden to false when show() is called', () => {
        spyOn(testHostComponent.navbarLinkComponent['ref'], 'detectChanges');
        testHostComponent.navbarLinkComponent._hidden = true;
        testHostComponent.navbarLinkComponent.show();
        expect(testHostComponent.navbarLinkComponent._hidden).toBeFalsy();
        expect(testHostComponent.navbarLinkComponent['ref'].detectChanges).toHaveBeenCalled();
    });
    it('should return the item width', () => {
        const link = testHostFixture.debugElement.query(By.directive(NavbarLinkComponent));
        spyOnProperty(link.nativeElement, 'scrollWidth', 'get').and.returnValue(2400);
        const width = testHostComponent.navbarLinkComponent._getWidth();
        expect(width).toEqual(2400);
    });
});
