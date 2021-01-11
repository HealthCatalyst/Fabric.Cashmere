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
    });

    it('should call _setActiveSectionById in nav when scrolling', () => {
        let setActiveSectionSpy: jasmine.Spy = spyOn(testApp.contentComponent.nav, '_setActiveSectionById');

        testApp.contentComponent._cdkScrollableElement
            .elementScrolled()
            .pipe(take(1))
            .subscribe(() => {
                expect(setActiveSectionSpy).toHaveBeenCalled();
            });

        testApp.contentComponent._cdkScrollableElement.scrollTo({top: 2000});
    });

    describe('ngOnInit', () => {
        afterEach(() => {
            testApp.contentComponent.sectionStyle = '';
            testApp.contentComponent.sectionHoverStyle = '';
            testApp.contentComponent.cssRules = '';
        });

        describe('should throw an error if a style is invalid', () => {
            it("when style doesn't have ':'", () => {
                testApp.contentComponent.sectionStyle = 'color pink;';

                let error;
                try {
                    testApp.contentComponent.ngOnInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent.sectionStyle}' need both ':'s and ';'s. Located in hc-scroll-nav-content.`);
                expect(error).toEqual(expectedError);
            });

            it("when style doesn't have ';'", () => {
                testApp.contentComponent.sectionStyle = 'color: pink';

                let error;
                try {
                    testApp.contentComponent.ngOnInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent.sectionStyle}' need both ':'s and ';'s. Located in hc-scroll-nav-content.`);
                expect(error).toEqual(expectedError);
            });

            it("when style doesn't have equal number of ':' and ';'", () => {
                testApp.contentComponent.sectionStyle = 'color: pink; color: blue';

                let error;
                try {
                    testApp.contentComponent.ngOnInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent.sectionStyle}' need both ':'s and ';'s. Located in hc-scroll-nav-content.`);
                expect(error).toEqual(expectedError);
            });
        });
    });

    describe('ngAfterViewInit', () => {
        beforeEach(() => {
            testApp.contentComponent._scrollTargets[0].setAttribute('sectionStyle', '');
            testApp.contentComponent.sectionStyle = '';
            testApp.contentComponent._scrollTargets[0].setAttribute('sectionHoverStyle', '');
            testApp.contentComponent.sectionHoverStyle = '';
            testApp.contentComponent._scrollTargets[0].setAttribute('cssRules', '');
            testApp.contentComponent.cssRules = '';
        });

        it("should throw error if target doesn't have a id", () => {
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

        describe('should throw an error if a style is invalid', () => {
            it("when style doesn't have ':'", () => {
                testApp.contentComponent._scrollTargets[0].setAttribute('sectionStyle', 'color pink;');

                let error;
                try {
                    testApp.contentComponent.ngAfterViewInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent._scrollTargets[0].getAttribute('sectionStyle')}' need both ':'s and ';'s. Located in a1.`);
                expect(error).toEqual(expectedError);
            });

            it("when style doesn't have ';'", () => {
                testApp.contentComponent._scrollTargets[0].setAttribute('sectionStyle', 'color: pink');

                let error;
                try {
                    testApp.contentComponent.ngAfterViewInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent._scrollTargets[0].getAttribute('sectionStyle')}' need both ':'s and ';'s. Located in a1.`);
                expect(error).toEqual(expectedError);
            });

            it("when style doesn't have equal number of ':' and ';'", () => {
                testApp.contentComponent._scrollTargets[0].setAttribute('sectionStyle', 'color: pink; color: blue');

                let error;
                try {
                    testApp.contentComponent.ngAfterViewInit();
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error(`All styles in 'sectionStyle: ${testApp.contentComponent._scrollTargets[0].getAttribute('sectionStyle')}' need both ':'s and ';'s. Located in a1.`);
                expect(error).toEqual(expectedError);
            });
        });
    });

    it('css styleSheet should have correct order of styles', () => {
        testApp.contentComponent._scrollTargets[0].setAttribute('sectionStyle', 'color: pink;');
        testApp.contentComponent.sectionStyle = 'color: red;';
        testApp.contentComponent._scrollTargets[0].setAttribute('sectionHoverStyle', 'color: blue;');
        testApp.contentComponent.sectionHoverStyle = 'color: orange;';
        testApp.contentComponent._scrollTargets[0].setAttribute('cssRules', 'section { color: green; }');
        testApp.contentComponent.cssRules = 'section { color: yellow; }';
        testApp.detectChanges();

        testApp.contentComponent.ngOnInit();
        testApp.contentComponent.ngAfterViewInit();

        let styleSheet = document.styleSheets[document.styleSheets.length - 1];
        let rules = (styleSheet as CSSStyleSheet).cssRules;
        let ruleList: CSSRule[] = [];

        for (let i = 0; i < rules.length; i++) {
            if (rules[i] instanceof CSSStyleRule) {
                let cssText = (rules[i] as CSSStyleRule).cssText;
                if (cssText === 'hc-scroll-nav-content { color: red; }' ||
                    cssText === 'hc-scroll-nav-content:hover { color: orange; }' ||
                    cssText === 'section { color: yellow; }' ||
                    cssText === '[hcscrolllink="#a1"] { color: red; }' ||
                    cssText === '[hcscrolllink="#a1"]:hover { color: orange; }' ||
                    cssText === '[hcscrolllink="#a1"] { color: pink; }' ||
                    cssText === '[hcscrolllink="#a1"]:hover { color: blue; }' ||
                    cssText === 'section { color: green; }') {
                        ruleList.push(rules[i]);
                }
            }
        }

        expect(ruleList[0].cssText).toEqual('hc-scroll-nav-content { color: red; }');
        expect(ruleList[1].cssText).toEqual('hc-scroll-nav-content:hover { color: orange; }');
        expect(ruleList[2].cssText).toEqual('section { color: yellow; }');
        expect(ruleList[3].cssText).toEqual('[hcscrolllink="#a1"] { color: red; }');
        expect(ruleList[4].cssText).toEqual('[hcscrolllink="#a1"]:hover { color: orange; }');
        expect(ruleList[5].cssText).toEqual('[hcscrolllink="#a1"] { color: pink; }');
        expect(ruleList[6].cssText).toEqual('[hcscrolllink="#a1"]:hover { color: blue; }');
        expect(ruleList[7].cssText).toEqual('section { color: green; }');
    });
});
