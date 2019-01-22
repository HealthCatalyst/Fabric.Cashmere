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
    @ViewChild(NavbarComponent)
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
    describe('on calling ngAfterViewInit', () => {
        it('should collect the widths of the links and call _navResize', async(() => {
            spyOn(testHostComponent.navbarComponent, '_navResize');
            const link = testHostFixture.debugElement.queryAll(By.css('.link'));
            spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(2400);
            spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(3400);
            expect(testHostComponent.navbarComponent._navLinks['_results'][0]._getWidth()).toEqual(2400);
            expect(testHostComponent.navbarComponent._navLinks['_results'][1]._getWidth()).toEqual(3400);
            testHostComponent.navbarComponent.ngAfterViewInit();
            testHostFixture.whenStable().then(() => {
                expect(testHostComponent.navbarComponent['_linksMax']).toEqual(5800);
                expect(testHostComponent.navbarComponent['_linkWidths'].length).toEqual(2);
                expect(testHostComponent.navbarComponent['_linkWidths'][0]).toEqual(3400);
                expect(testHostComponent.navbarComponent['_linkWidths'][1]).toEqual(2400);
                expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
            });
        }));
    });
    describe('on calling _navResize', () => {
        it('should adjust the elements according to the navbar size', async(() => {
            spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
            const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
            spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(0);
            spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
            testHostComponent.navbarComponent.ngAfterViewInit();
            testHostFixture.whenStable().then(() => {
                expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(0);
            });
        }));
    });
    describe('on calling _navResize', () => {
        // The cut off points are between regularWidth which in thiscase = switcher(55) +
        // logowidth(200) +
        // linkWidths (200 + 300) +
        // icons (400) = 1155
        // and condensedWidth = 1155 - 50 = 1105
        describe('and  adjust the elements according to the navbar size', () => {
            it('should have nothing in the moreList if the navbar > regularWidth', async(() => {
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                spyOn(testHostComponent.navbarComponent['ref'], 'detectChanges');
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'show');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'show');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(2400);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeFalsy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeFalsy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].show).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].show).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent['ref'].detectChanges).toHaveBeenCalled();
                });
            }));
            it('should have two items in the moreList if the navbar is 0', async(() => {
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(0);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'hide');

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(2);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].hide).toHaveBeenCalled();
                });
            }));
            it('should have a condensed logo if the width is between regular and condensed', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(1155);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeFalsy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                });
            }));
            it('should have a condensed logo if the width is between regular and condensed', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(1106);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeFalsy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                });
            }));
            it('should have a condensed logo if the width is between regular and condensed', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(1154);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(0);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeFalsy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                });
            }));
            // tslint:disable-next-line:max-line-length
            it('should have a condensed logo if the width is less than condensed and takes the width of the more element into account', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'show');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(1105);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(1);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].show).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].hide).toHaveBeenCalled();
                });
            }));
            // tslint:disable-next-line:max-line-length
            it('should have a condensed logo if the width is less than condensed and takes the width of the more element into account', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(721);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(2);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].hide).toHaveBeenCalled();
                });
            }));
            // tslint:disable-next-line:max-line-length
            it('should have a condensed logo if the width is less than condensed and takes the width of the more element into account', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'show');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(922);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(1);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].show).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].hide).toHaveBeenCalled();
                });
            }));
            // tslint:disable-next-line:max-line-length
            it('should have a condensed logo if the width is less than condensed and takes the width of the more element into account', async(() => {
                const link = testHostFixture.debugElement.queryAll(By.css('.link'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(300);
                spyOn(testHostComponent.navbarComponent, '_navResize').and.callThrough();
                const linkContainer = testHostFixture.debugElement.query(By.css('.hc-navbar-link-container'));
                spyOnProperty(linkContainer.nativeElement, 'clientWidth', 'get').and.returnValue(100);
                const icons = testHostFixture.debugElement.query(By.css('.hc-navbar-right-container'));
                spyOnProperty(icons.nativeElement, 'scrollWidth', 'get').and.returnValue(400);
                const logo = testHostFixture.debugElement.query(By.css('.navbar-app'));
                spyOnProperty(logo.nativeElement, 'scrollWidth', 'get').and.returnValue(200);
                spyOn(testHostComponent.navbarComponent._navbarMore, '_hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][0], 'hide');
                spyOn(testHostComponent.navbarComponent._navLinks['_results'][1], 'hide');

                const navbar = testHostFixture.debugElement.query(By.css('.hc-navbar'));
                spyOnProperty(navbar.nativeElement, 'scrollWidth', 'get').and.returnValue(921);

                testHostComponent.navbarComponent.ngAfterViewInit();
                testHostFixture.whenStable().then(() => {
                    expect(testHostComponent.navbarComponent._navResize).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navbarMore._hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._moreList.length).toEqual(2);
                    expect(testHostComponent.navbarComponent['_logoWidth']).toEqual(200);
                    expect(testHostComponent.navbarComponent['_collapse']).toBeTruthy();
                    expect(testHostComponent.navbarComponent['_logoCondense']).toBeTruthy();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][0].hide).toHaveBeenCalled();
                    expect(testHostComponent.navbarComponent._navLinks['_results'][1].hide).toHaveBeenCalled();
                });
            }));
        });
    });
});
