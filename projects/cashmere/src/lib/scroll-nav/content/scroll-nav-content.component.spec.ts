import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

import {HcScrollNavComponent} from '../nav/scroll-nav.component';
import {HcScrollNavContentComponent} from './scroll-nav-content.component';
import {ScrollNavModule} from '../scroll-nav.module';
import {take} from 'rxjs/operators';

@Component({
    template: `
        <div class="container" height="400px">
            <hc-scroll-nav #ScrollNav>
                <ul>
                    <li hcScrollLink="a1">Test 1</li>
                    <li hcScrollLink="a2">Test 2</li>
                    <li hcScrollLink="a3">Test 3</li>
                </ul>
            </hc-scroll-nav>

            <hc-scroll-nav-content [nav]="ScrollNav">
                <section id="a1" hcScrollTarget>Test 1 Content</section>
                <section id="a2" hcScrollTarget>Test 2 Content</section>
                <section id="a3" hcScrollTarget>Test 3 Content</section>
            </hc-scroll-nav-content>
        </div>
    `
})
class TestAppComponent {}

class TestAppReference {
    fixture: ComponentFixture<TestAppComponent>;
    testAppComponent: TestAppComponent;
    linksComponent: HcScrollNavComponent;
    contentComponent: HcScrollNavContentComponent;

    constructor() {
        this.fixture = TestBed.createComponent(TestAppComponent);
        const debugEl = this.fixture.debugElement;
        this.testAppComponent = debugEl.componentInstance;
        this.linksComponent = debugEl.query(By.directive(HcScrollNavComponent)).componentInstance as HcScrollNavComponent;
        this.contentComponent = debugEl.query(By.directive(HcScrollNavContentComponent)).componentInstance as HcScrollNavContentComponent;
    }

    detectChanges() {
        this.fixture.detectChanges();
    }
}

let testApp: TestAppReference;

describe('HcScrollNavContentComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ScrollNavModule],
            declarations: [TestAppComponent]
        }).compileComponents();
        testApp = new TestAppReference();
        testApp.detectChanges();
    }));

    it('should create a content component', () => {
        expect(testApp.contentComponent).toBeTruthy();
    });

    it('should create a link component', () => {
        expect(testApp.linksComponent).toBeTruthy();
    });

    it('should be correct number of scroll targets', () => {
        expect(testApp.contentComponent._scrollTargets.length).toBe(3);
    });

    it('should be a particular class on each hcScrollTarget', () => {
        expect(testApp.contentComponent._scrollTargets[0].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[1].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[2].classList.contains('hc-scroll-nav-target')).toBeTruthy();
    });

    it('should call _setActiveClassById in nav when scrolling', () => {
        let setActiveClassSpy: jasmine.Spy = spyOn(testApp.contentComponent.nav, '_setActiveClassById');

        testApp.contentComponent._cdkScrollableElement
            .elementScrolled()
            .pipe(take(1))
            .subscribe(() => {
                expect(setActiveClassSpy).toHaveBeenCalled();
            });

        testApp.contentComponent._cdkScrollableElement.scrollTo({top: 2000});
    });
});
