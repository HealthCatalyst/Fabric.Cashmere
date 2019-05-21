import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import {HcScrollNavComponent} from './scroll-nav.component';
import {HcScrollNavContentComponent} from '../content/scroll-nav-content.component';
import {ScrollNavModule} from '../scroll-nav.module';

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

describe('HcScrollNavComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ScrollNavModule],
            declarations: [TestAppComponent]
        }).compileComponents();
        testApp = new TestAppReference();
        testApp.detectChanges();
    }));

    it('should create a link component', () => {
        expect(testApp.linksComponent).toBeTruthy();
    });

    it('should create a content component', () => {
        expect(testApp.contentComponent).toBeTruthy();
    });

    it('should be correct number of links', () => {
        expect(testApp.linksComponent._links.length).toBe(3);
    });

    it('should be a particular class on each hcScrollLink', () => {
        expect(testApp.linksComponent._links[0].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[1].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[2].classList.contains('hc-scroll-nav-link')).toBeTruthy();
    });

    it("should set first link element to 'active'", () => {
        let firstListElement = testApp.linksComponent._links[0];

        expect(firstListElement.classList.contains('hc-scroll-nav-active')).toBeTruthy();
    });

    it("_setActiveClassById should set passed in element to 'active'", () => {
        testApp.linksComponent._setActiveClassById('a2');

        expect(testApp.linksComponent._links[0].classList.contains('hc-scroll-nav-active')).toBeFalsy();
        expect(testApp.linksComponent._links[1].classList.contains('hc-scroll-nav-active')).toBeTruthy();
        expect(testApp.linksComponent._links[2].classList.contains('hc-scroll-nav-active')).toBeFalsy();
    });
});
