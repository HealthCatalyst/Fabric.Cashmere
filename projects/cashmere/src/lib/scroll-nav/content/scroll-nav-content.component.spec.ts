import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

import {HcScrollNavComponent} from '../nav/scroll-nav.component';
import {HcScrollNavContentComponent} from './scroll-nav-content.component';
import {ScrollNavModule} from '../scroll-nav.module';
import {take} from 'rxjs/operators';

@Component({
    template: `
        <div class='container' height='400px'>
            <hc-scroll-nav #ScrollNav>
                <ul>
                    <li hcScrollLink='a1'>
                        Test 1
                        <ul>
                            <li hcScrollLink='b1'>
                                Test Subsection 1
                                <ul>
                                    <li hcScrollLink='c1'>Test SubSubsection 1</li>
                                    <li hcScrollLink='c2'>Test SubSubsection 1</li>
                                </ul>
                            </li>
                            <li hcScrollLink='b2'>Test Subsection 2</li>
                        </ul>
                    </li>
                    <li hcScrollLink='a2'>Test 2</li>
                    <li hcScrollLink='a3'>
                        Test 3
                        <ul>
                            <li hcScrollLink='b3'>
                                Test Subsection 3
                            </li>
                        </ul>
                    </li>
                </ul>
            </hc-scroll-nav>

            <hc-scroll-nav-content [nav]='ScrollNav'>
                <section id='a1' hcScrollTarget>
                    Test 1 Content
                    <section id='b1' hcScrollTarget>
                        Test Subsection 1 Content
                        <section id='c1' hcScrollTarget>
                            Test SubSubsection 1 Content
                        </section>
                        <section id='c2' hcScrollTarget>
                            Test SubSubsection 2 Content
                        </section>
                    </section>
                    <section id='b2' hcScrollTarget>
                        Test Subsection 2 Content
                    </section>
                </section>
                <section id='a2' hcScrollTarget>Test 2 Content</section>
                <section id='a3' hcScrollTarget>
                    Test 3 Content
                    <section id='b3' hcScrollTarget>
                        Test Subsection 3 Content
                    </section>
                </section>
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
        expect(testApp.contentComponent._scrollTargets.length).toBe(8);
    });

    it('should be a particular class on each hcScrollTarget', () => {
        expect(testApp.contentComponent._scrollTargets[0].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[1].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[2].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[3].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[4].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[5].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[6].classList.contains('hc-scroll-nav-target')).toBeTruthy();
        expect(testApp.contentComponent._scrollTargets[7].classList.contains('hc-scroll-nav-target')).toBeTruthy();
    });

    it('should call _setActiveSectionById in nav when scrolling', waitForAsync(() => {
        let setActiveSectionSpy: jasmine.Spy = spyOn(testApp.contentComponent.nav, '_setActiveSectionById');

        testApp.contentComponent._cdkScrollableElement
            .elementScrolled()
            .pipe(take(1))
            .subscribe(() => {
                expect(setActiveSectionSpy).toHaveBeenCalledWith();
            });

        testApp.contentComponent._cdkScrollableElement.scrollTo({top: 200});
    }));

    it("ngAfterViewInit should throw error if target doesn't have a id", () => {
        testApp.contentComponent._scrollTargets[0].id = '';

        let error;
        try {
            testApp.contentComponent.ngAfterViewInit();
        } catch (e) {
            error = e;
        }

        const expectedError = new Error('hcScrollTarget element needs an id.');
        expect(error).toEqual(expectedError);
    });
});
