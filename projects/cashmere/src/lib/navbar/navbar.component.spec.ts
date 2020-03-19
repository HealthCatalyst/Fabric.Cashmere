import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {ListModule} from '../list/list.module';
import {NavbarComponent} from './navbar.component';
import {NavbarModule} from './navbar.module';

@Component({
    template: `
        <hc-navbar brandIcon="./assets/TriFlame.svg" user="Christine K." [homeUri]="undefined" [fixedTop]="false">
            <hc-navbar-link class="link" [active]="true" uri="undefined" linkText="Home"></hc-navbar-link>
            <hc-navbar-link class="link" [active]="true" uri="undefined" linkText="Admin"></hc-navbar-link>
            <hc-navbar-mobile-menu>
                <hc-list>
                    <hc-list-item routerLink="/home" routerLinkActive="active-link"><span hcListLine>Home</span></hc-list-item>
                </hc-list>
            </hc-navbar-mobile-menu>
        </hc-navbar>
    `
})
class TestAppComponent {
    @ViewChild(NavbarComponent, /* TODO: add static flag */ {})
    public navbarComponent: NavbarComponent;
}

describe('NavbarComponent', () => {
    let testHostComponent: TestAppComponent;
    let testHostFixture: ComponentFixture<TestAppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NavbarModule, ListModule],
            declarations: [TestAppComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestAppComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    });
    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });
    describe('on calling _collectNavLinkWidths', () => {
        it('should collect the widths of the links', () => {
            const link = testHostFixture.debugElement.queryAll(By.css('.link'));
            spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(2400);
            spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(3400);
            expect(testHostComponent.navbarComponent._navLinks['_results'][0]._getWidth()).toEqual(2400);
            expect(testHostComponent.navbarComponent._navLinks['_results'][1]._getWidth()).toEqual(3400);
            testHostComponent.navbarComponent['_collectNavLinkWidths']();
            expect(testHostComponent.navbarComponent['_linksTotalWidth']).toEqual(5800);
            expect(testHostComponent.navbarComponent['_linkWidths'].length).toEqual(2);
            expect(testHostComponent.navbarComponent['_linkWidths'][0]).toEqual(2400);
            expect(testHostComponent.navbarComponent['_linkWidths'][1]).toEqual(3400);
        });
    });

    describe('on calling all the lifecycle hooks', () => {
        it('should call _navResize', async(() => {
            spyOn(testHostComponent.navbarComponent, '_navResize');
            testHostComponent.navbarComponent.ngAfterViewInit();
            testHostFixture.whenStable().then(() => {
                expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
            });
        }));
    });
    describe('on calling _navResize', () => {
        describe('and adjust the elements according to the navbar size', () => {
            it('should have nothing in moreList if navbar links container > linksTotalWidth', () => {
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'offsetWidth', 'get').and.returnValue(300);

                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(110);

                testHostComponent.navbarComponent['_collectNavLinkWidths']();
                testHostComponent.navbarComponent._navResize();

                expect(linkContainer.nativeElement['offsetWidth']).toEqual(300);
                expect(testHostComponent.navbarComponent['_linksTotalWidth']).toEqual(220);
                expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                expect(testHostComponent.navbarComponent['_collapse']).toBeFalsy();
            });
            it('should have two items in moreList if navbar links container is 50px', () => {
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'offsetWidth', 'get').and.returnValue(50);

                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(110);

                testHostComponent.navbarComponent['_collectNavLinkWidths']();
                testHostComponent.navbarComponent._navResize();

                expect(linkContainer.nativeElement['offsetWidth']).toEqual(50);
                expect(testHostComponent.navbarComponent['_linksTotalWidth']).toEqual(220);
                expect(testHostComponent.navbarComponent._moreList.length).toEqual(2);
                expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
            });
        });
    });
});
