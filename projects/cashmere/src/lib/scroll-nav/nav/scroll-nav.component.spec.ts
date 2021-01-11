import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

import {HcScrollNavComponent} from './scroll-nav.component';
import {HcScrollNavContentComponent} from '../content/scroll-nav-content.component';
import {ScrollNavModule} from '../scroll-nav.module';

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

const a1 = 0;
const b1 = 1;
const c1 = 2;
const c2 = 3;
const b2 = 4;
const a2 = 5;
const a3 = 6;
const b3 = 7;

const ACTIVE_CLASS = 'hc-scroll-nav-link-active';
const INACTIVE_CLASS = 'hc-scroll-nav-link-inactive';
const PARENT_SECTION_CLASS = 'hc-scroll-nav-parent-section-link';
const ACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-active-parent-section-link';
const INACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-inactive-parent-section-link';
const SUBSECTION_CLASS = 'hc-scroll-nav-subsection-link';

describe('HcScrollNavComponent', () => {
    beforeEach(waitForAsync(() => {
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
        expect(testApp.linksComponent._links.length).toBe(8);
    });

    it('should be a particular class on each hcScrollLink', () => {
        expect(testApp.linksComponent._links[a1].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[b1].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[c1].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[c2].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[b2].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[a2].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[a3].classList.contains('hc-scroll-nav-link')).toBeTruthy();
        expect(testApp.linksComponent._links[b3].classList.contains('hc-scroll-nav-link')).toBeTruthy();
    });
    
    describe('_setActiveSectionById', () => {
        it("should throw an error if it can't find link with appropriate id", () => {
            let error;
            try {
                testApp.linksComponent._setActiveSectionById('test');
            } catch (e) {
                error = e;
            }

            expect(error).toEqual(new Error('Failed to mark active section. Could not find the element with the data target for id: test.'));
        });

        it('should activate passed in link and inactivate all others', () => {
            testApp.linksComponent._setActiveSectionById('a2');

            expect(testApp.linksComponent._links[a1].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[b1].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b1].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[c1].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[c1].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[c2].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[c2].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[b2].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b2].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[a2].className.indexOf(ACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[a2].className.indexOf(INACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[a3].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[a3].className.indexOf(ACTIVE_CLASS)).toEqual(-1);

            expect(testApp.linksComponent._links[b3].className.indexOf(INACTIVE_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b3].className.indexOf(ACTIVE_CLASS)).toEqual(-1);
        });

        it('should add active parent section class when link is a parent and has an active subsection', () => {
            testApp.linksComponent._setActiveSectionById('c1');

            expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
        });

        it('should add active parent section class when link is a parent and has an active subsection2', () => {
            testApp.linksComponent._setActiveSectionById('c1');

            expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
        });

        it('should not add active parent section class when link is a parent but does not have an active subsection', () => {
            testApp.linksComponent._setActiveSectionById('a2');

            expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toEqual(-1);
            expect(testApp.linksComponent._links[a1].className.indexOf(INACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            expect(testApp.linksComponent._links[b1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toEqual(-1);
            expect(testApp.linksComponent._links[b1].className.indexOf(INACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
        });
    });

    describe('ngOnInit', () => {
        describe('general styles', () => {
            afterEach(() => {
                testApp.linksComponent.activeStyle = '';
                testApp.linksComponent.activeHoverStyle = '';
                testApp.linksComponent.inactiveStyle = '';
                testApp.linksComponent.inactiveHoverStyle = '';
                testApp.linksComponent.baseStyle = '';
                testApp.linksComponent.baseHoverStyle = '';
                testApp.linksComponent.parentActiveStyle = '';
                testApp.linksComponent.parentActiveHoverStyle = '';
                testApp.linksComponent.parentInactiveStyle = '';
                testApp.linksComponent.parentInactiveHoverStyle = '';
            })
    
            describe('should throw an error if a style is invalid', () => {
                it("when style doesn't have ':'", () => {
                    testApp.linksComponent.activeStyle = 'color pink;';
    
                    let error;
                    try {
                        testApp.linksComponent.ngOnInit()
                    } catch (e) {
                        error = e;
                    }
    
                    const expectedError = new Error(`All styles in 'activeStyle: ${testApp.linksComponent.activeStyle}' need both ':'s and ';'s. Located in hc-scroll-nav.`);
                    expect(error).toEqual(expectedError);
                });
    
                it("when style doesn't have ';'", () => {
                    testApp.linksComponent.activeStyle = 'color: pink';
    
                    let error;
                    try {
                        testApp.linksComponent.ngOnInit()
                    } catch (e) {
                        error = e;
                    }
    
                    const expectedError = new Error(`All styles in 'activeStyle: ${testApp.linksComponent.activeStyle}' need both ':'s and ';'s. Located in hc-scroll-nav.`);
                    expect(error).toEqual(expectedError);
                });
    
                it("when style doesn't have equal number of ':' and ';'", () => {
                    testApp.linksComponent.activeStyle = 'color: pink; color: blue';
    
                    let error;
                    try {
                        testApp.linksComponent.ngOnInit()
                    } catch (e) {
                        error = e;
                    }
    
                    const expectedError = new Error(`All styles in 'activeStyle: ${testApp.linksComponent.activeStyle}' need both ':'s and ';'s. Located in hc-scroll-nav.`);
                    expect(error).toEqual(expectedError);
                });
            });
        });
    });

    describe('ngAfterViewInit', () => {
        describe('initial classes', () => {
            it('should add parent section class when children section(s) exist', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[a1].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b1].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[a3].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it("should not add parent section class when children sections don't exist", () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[c1].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[c2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[b2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
            });

            it('should add active parent section class when link is a parent and has an active subsection', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should not add active parent section class when link is a parent but is not active', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[a3].className.indexOf(INACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should set subsection class when link has a parent section', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[b1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[c1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[c1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b2].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b3].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should not set subsection class when link does not have a parent section', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[a1].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a2].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a3].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
            });
        });

        describe('first link', () => {
            it('should get the active class', () => {
                testApp.linksComponent.ngAfterViewInit();

                expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_CLASS)).toBeGreaterThan(-1);
            });

            it('should have the baseStyle applied', () => {
                testApp.linksComponent._links[a1].setAttribute('baseStyle', 'color: pink;');

                testApp.linksComponent.ngAfterViewInit();
        
                let styleSheet = document.styleSheets[document.styleSheets.length - 1];
                let rules = (styleSheet as CSSStyleSheet).cssRules;
                let ruleList: CSSRule[] = [];
        
                for (let i = 0; i < rules.length; i++) {
                    if (rules[i] instanceof CSSStyleRule) {
                        let cssText = (rules[i] as CSSStyleRule).cssText;
                        if (cssText === '[hcscrolllink="a1"] { color: pink; }') {
                            ruleList.push(rules[i]);
                        }
                    }
                }
        
                expect(ruleList[0].cssText).toEqual('[hcscrolllink="a1"] { color: pink; }');
            });

            it('should have the baseHoverStyle applied', () => {
                testApp.linksComponent._links[a1].setAttribute('baseHoverStyle', 'color: blue;');

                testApp.linksComponent.ngAfterViewInit();
        
                let styleSheet = document.styleSheets[document.styleSheets.length - 1];
                let rules = (styleSheet as CSSStyleSheet).cssRules;
                let ruleList: CSSRule[] = [];
        
                for (let i = 0; i < rules.length; i++) {
                    if (rules[i] instanceof CSSStyleRule) {
                        let cssText = (rules[i] as CSSStyleRule).cssText;
                        if (cssText === '[hcscrolllink="a1"]:hover { color: blue; }') {
                            ruleList.push(rules[i]);
                        }
                    }
                }
        
                expect(ruleList[0].cssText).toEqual('[hcscrolllink="a1"]:hover { color: blue; }');
            });
        });
    });

    it('should set styles in the correct order in the css styleSheet', () => {
        testApp.linksComponent._links[a1].setAttribute('activeStyle', 'color: pink;');
        testApp.linksComponent._links[a1].setAttribute('activeHoverStyle', 'color: blue;');
        testApp.linksComponent._links[a1].setAttribute('inactiveStyle', 'color: hotpink;');
        testApp.linksComponent._links[a1].setAttribute('inactiveHoverStyle', 'color: cornflowerblue;');
        testApp.linksComponent._links[a1].setAttribute('baseStyle', 'color: lightpink;');
        testApp.linksComponent._links[a1].setAttribute('baseHoverStyle', 'color: darkblue;');
        testApp.linksComponent._links[a1].setAttribute('parentActiveStyle', 'color: magenta;');
        testApp.linksComponent._links[a1].setAttribute('parentActiveHoverStyle', 'color: darkslateblue;');
        testApp.linksComponent._links[a1].setAttribute('parentInactiveStyle', 'color: mediumvioletred;');
        testApp.linksComponent._links[a1].setAttribute('parentInactiveHoverStyle', 'color: dodgerblue;');
        testApp.linksComponent._links[a1].setAttribute('cssRules', '[hcScrollLink] { color: green; }');

        testApp.linksComponent.activeStyle = 'color: deeppink;';
        testApp.linksComponent.activeHoverStyle = 'color: deepskyblue;';
        testApp.linksComponent.inactiveStyle = 'color: fuchsia;';
        testApp.linksComponent.inactiveHoverStyle = 'color: lightblue;';
        testApp.linksComponent.baseStyle = 'color: lightcoral;';
        testApp.linksComponent.baseHoverStyle = 'color: lightskyblue;';
        testApp.linksComponent.parentActiveStyle = 'color: mediumorchid;';
        testApp.linksComponent.parentActiveHoverStyle = 'color: midnightblue;';
        testApp.linksComponent.parentInactiveStyle = 'color: palevioletred;';
        testApp.linksComponent.parentInactiveHoverStyle = 'color: navy;';
        testApp.linksComponent.cssRules = '[hcScrollLink] { color: limegreen; }';

        testApp.linksComponent.ngOnInit();
        testApp.linksComponent.ngAfterViewInit();

        let styleSheet = document.styleSheets[document.styleSheets.length - 1];
        let rules = (styleSheet as CSSStyleSheet).cssRules;
        let ruleList: CSSRule[] = [];

        for (let i = 0; i < rules.length; i++) {
            if (rules[i] instanceof CSSStyleRule) {
                let cssText = (rules[i] as CSSStyleRule).cssText;
                if (cssText === `[hcscrolllink].${ACTIVE_CLASS} { color: deeppink; }` ||
                    cssText === `[hcscrolllink].${ACTIVE_CLASS}:hover { color: deepskyblue; }` ||
                    cssText === `[hcscrolllink].${INACTIVE_CLASS} { color: fuchsia; }` ||
                    cssText === `[hcscrolllink].${INACTIVE_CLASS}:hover { color: lightblue; }` ||
                    cssText === '[hcscrolllink] { color: lightcoral; }' ||
                    cssText === '[hcscrolllink]:hover { color: lightskyblue; }' ||
                    cssText === `[hcscrolllink].${ACTIVE_PARENT_SECTION_CLASS} { color: mediumorchid; }` ||
                    cssText === `[hcscrolllink].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: midnightblue; }` ||
                    cssText === `[hcscrolllink].${INACTIVE_PARENT_SECTION_CLASS} { color: palevioletred; }` ||
                    cssText === `[hcscrolllink].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: navy; }` ||
                    cssText === '[hcscrolllink] { color: limegreen; }' ||
                    cssText === '[hcscrolllink="a1"] { color: lightcoral; }' ||
                    cssText === '[hcscrolllink="a1"] { color: lightpink; }' ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_CLASS} { color: fuchsia; }` ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_CLASS} { color: hotpink; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_CLASS} { color: deeppink; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_CLASS} { color: pink; }` ||
                    cssText === '[hcscrolllink="a1"]:hover { color: lightskyblue; }' ||
                    cssText === '[hcscrolllink="a1"]:hover { color: darkblue; }' ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_CLASS}:hover { color: lightblue; }` ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_CLASS}:hover { color: cornflowerblue; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_CLASS}:hover { color: deepskyblue; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_CLASS}:hover { color: blue; }` ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS} { color: palevioletred; }` || 
                    cssText === `[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS} { color: mediumvioletred; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS} { color: mediumorchid; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS} { color: magenta; }` ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: navy; }` ||
                    cssText === `[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: dodgerblue; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: midnightblue; }` ||
                    cssText === `[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: darkslateblue; }` ||
                    cssText === '[hcscrolllink] { color: green; }'
                    ) {
                        ruleList.push(rules[i]);
                }
            }
        }

        expect(ruleList[0].cssText).toEqual(`[hcscrolllink].${ACTIVE_CLASS} { color: deeppink; }`);
        expect(ruleList[1].cssText).toEqual(`[hcscrolllink].${ACTIVE_CLASS}:hover { color: deepskyblue; }`);
        expect(ruleList[2].cssText).toEqual(`[hcscrolllink].${INACTIVE_CLASS} { color: fuchsia; }`);
        expect(ruleList[3].cssText).toEqual(`[hcscrolllink].${INACTIVE_CLASS}:hover { color: lightblue; }`);
        expect(ruleList[4].cssText).toEqual('[hcscrolllink] { color: lightcoral; }');
        expect(ruleList[5].cssText).toEqual('[hcscrolllink]:hover { color: lightskyblue; }');
        expect(ruleList[6].cssText).toEqual(`[hcscrolllink].${ACTIVE_PARENT_SECTION_CLASS} { color: mediumorchid; }`);
        expect(ruleList[7].cssText).toEqual(`[hcscrolllink].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: midnightblue; }`);
        expect(ruleList[8].cssText).toEqual(`[hcscrolllink].${INACTIVE_PARENT_SECTION_CLASS} { color: palevioletred; }`);
        expect(ruleList[9].cssText).toEqual(`[hcscrolllink].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: navy; }`);
        expect(ruleList[10].cssText).toEqual('[hcscrolllink] { color: limegreen; }');
        expect(ruleList[11].cssText).toEqual('[hcscrolllink="a1"] { color: lightcoral; }');
        expect(ruleList[12].cssText).toEqual('[hcscrolllink="a1"] { color: lightpink; }');
        expect(ruleList[13].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_CLASS} { color: fuchsia; }`);
        expect(ruleList[14].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_CLASS} { color: hotpink; }`);
        expect(ruleList[15].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_CLASS} { color: deeppink; }`);
        expect(ruleList[16].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_CLASS} { color: pink; }`);
        expect(ruleList[17].cssText).toEqual('[hcscrolllink="a1"]:hover { color: lightskyblue; }');
        expect(ruleList[18].cssText).toEqual('[hcscrolllink="a1"]:hover { color: darkblue; }');
        expect(ruleList[19].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_CLASS}:hover { color: lightblue; }`);
        expect(ruleList[20].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_CLASS}:hover { color: cornflowerblue; }`);
        expect(ruleList[21].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_CLASS}:hover { color: deepskyblue; }`);
        expect(ruleList[22].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_CLASS}:hover { color: blue; }`);
        expect(ruleList[23].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS} { color: palevioletred; }`); 
        expect(ruleList[24].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS} { color: mediumvioletred; }`);
        expect(ruleList[25].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS} { color: mediumorchid; }`);
        expect(ruleList[26].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS} { color: magenta; }`);
        expect(ruleList[27].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: navy; }`);
        expect(ruleList[28].cssText).toEqual(`[hcscrolllink="a1"].${INACTIVE_PARENT_SECTION_CLASS}:hover { color: dodgerblue; }`);
        expect(ruleList[29].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: midnightblue; }`);
        expect(ruleList[30].cssText).toEqual(`[hcscrolllink="a1"].${ACTIVE_PARENT_SECTION_CLASS}:hover { color: darkslateblue; }`);
        expect(ruleList[31].cssText).toEqual('[hcscrolllink] { color: green; }');
    });
});
