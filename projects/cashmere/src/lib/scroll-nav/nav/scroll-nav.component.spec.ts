import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HcScrollNavComponent } from './scroll-nav.component';
import { HcScrollNavContentComponent } from '../content/scroll-nav-content.component';

import { ScrollNavLinkDirective } from './scroll-nav-link.directive';
import { ScrollNavModule } from '../scroll-nav.module';

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
let renderer: any;

const a1 = 0;
const b1 = 1;
const c1 = 2;
const c2 = 3;
const b2 = 4;
const a2 = 5;
const a3 = 6;
const b3 = 7;

const SCROLL_LINK_ATTRIBUTE = 'hcScrollLink';
const ACTIVE_CLASS = 'hc-scroll-nav-link-active';
const INACTIVE_CLASS = 'hc-scroll-nav-link-inactive';
const PARENT_SECTION_CLASS = 'hc-scroll-nav-parent-section-link';
const ACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-active-parent-section-link';
const INACTIVE_PARENT_SECTION_CLASS = 'hc-scroll-nav-inactive-parent-section-link';
const SUBSECTION_CLASS = 'hc-scroll-nav-subsection-link';
const LINKS_CONTAINER_CLASS = 'hc-scroll-nav-links-container';

export class MockElementRef extends ElementRef {
    constructor() { super(undefined); }
}

export class MockNode extends Node {
    constructor() { super(); }
}

describe('HcScrollNavComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestAppComponent],
            imports: [ScrollNavModule],
            providers: [Renderer2]
        }).compileComponents();
        testApp = new TestAppReference();
        renderer = TestBed.inject(Renderer2);

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

            expect(error).toEqual(
                new Error('Failed to mark active section. Could not find the element with the data target for id: test.')
            );
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

        describe("scrollToElement", () => {
            it('should call measureScrollOffset if scrollNavWithContent is true', () => {
                let measureScrollOffsetSpy: jasmine.Spy = spyOn(testApp.linksComponent._cdkScrollableElement, "measureScrollOffset");
                testApp.linksComponent.scrollNavWithContent = true;
                testApp.detectChanges();

                testApp.linksComponent._setActiveSectionById('a2');

                expect(measureScrollOffsetSpy).toHaveBeenCalledWith('top');
            });

            it('should not call measureScrollOffset if scrollNavWithContent is false', () => {
                let measureScrollOffsetSpy: jasmine.Spy = spyOn(testApp.linksComponent._cdkScrollableElement, "measureScrollOffset");
                testApp.linksComponent.scrollNavWithContent = false;

                testApp.linksComponent._setActiveSectionById('a2');

                expect(measureScrollOffsetSpy).not.toHaveBeenCalled();
            });

            it('should call scrollTo if element is under scroll view area and isScrolling is false', () => {
                let scrollToSpy: jasmine.Spy = spyOn(testApp.linksComponent._cdkScrollableElement, "scrollTo");
                testApp.linksComponent.scrollNavWithContent = true;
                testApp.linksComponent.isScrolling = false;
                testApp.linksComponent._elementRef.nativeElement.querySelector(`.${LINKS_CONTAINER_CLASS}`).style.height = '200px';
                testApp.detectChanges();

                testApp.linksComponent._setActiveSectionById('b3');

                expect(scrollToSpy).toHaveBeenCalled();
            });

            it('should not call scrollTo if element is under scroll view area but isScrolling is true', () => {
                let scrollToSpy: jasmine.Spy = spyOn(testApp.linksComponent._cdkScrollableElement, "scrollTo");
                testApp.linksComponent.scrollNavWithContent = true;
                testApp.linksComponent.isScrolling = true;
                testApp.linksComponent._elementRef.nativeElement.querySelector(`.${LINKS_CONTAINER_CLASS}`).style.height = '200px';
                testApp.detectChanges();

                testApp.linksComponent._setActiveSectionById('b3');

                expect(scrollToSpy).not.toHaveBeenCalled();
            });

            it('should call scrollIntoView if element is above scroll view area and isScrolling is false', () => {
                let scrollIntoViewSpy: jasmine.Spy = spyOn(testApp.linksComponent._elementRef.nativeElement.querySelector(`[${SCROLL_LINK_ATTRIBUTE}='a1']`), "scrollIntoView");
                testApp.linksComponent._elementRef.nativeElement.querySelector(`.${LINKS_CONTAINER_CLASS}`).style.height = '200px';
                testApp.detectChanges();

                spyOn(testApp.linksComponent._cdkScrollableElement, "measureScrollOffset").and.returnValue(126);
                testApp.linksComponent.isScrolling = false;
                testApp.linksComponent.scrollNavWithContent = true;

                testApp.linksComponent._setActiveSectionById('a1');

                expect(scrollIntoViewSpy).toHaveBeenCalled();
            });

            it('should not call scrollIntoView if element is above scroll view area and isScrolling is true', () => {
                let scrollIntoViewSpy: jasmine.Spy = spyOn(testApp.linksComponent._elementRef.nativeElement.querySelector(`[${SCROLL_LINK_ATTRIBUTE}='a1']`), "scrollIntoView");
                testApp.linksComponent._elementRef.nativeElement.querySelector(`.${LINKS_CONTAINER_CLASS}`).style.height = '200px';
                testApp.detectChanges();

                spyOn(testApp.linksComponent._cdkScrollableElement, "measureScrollOffset").and.returnValue(126);
                testApp.linksComponent.isScrolling = true;
                testApp.linksComponent.scrollNavWithContent = true;

                testApp.linksComponent._setActiveSectionById('a1');

                expect(scrollIntoViewSpy).not.toHaveBeenCalled();
            });

            it('should not scroll if element is in the scroll view area', () => {
                let scrollToSpy: jasmine.Spy = spyOn(testApp.linksComponent._cdkScrollableElement, "scrollTo");
                let scrollIntoViewSpy: jasmine.Spy = spyOn(testApp.linksComponent._elementRef.nativeElement.querySelector(`[${SCROLL_LINK_ATTRIBUTE}='a1']`), "scrollIntoView");

                testApp.linksComponent._elementRef.nativeElement.querySelector(`.${LINKS_CONTAINER_CLASS}`).style.height = '200px';
                testApp.linksComponent.scrollNavWithContent = true;

                testApp.linksComponent._setActiveSectionById('a1');

                expect(scrollToSpy).not.toHaveBeenCalled();
                expect(scrollIntoViewSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('ngAfterViewInit', () => {
        it('should call refreshScrollNavLinks', fakeAsync(() => {
            let refreshScrollNavLinksSpy: jasmine.Spy = spyOn(testApp.linksComponent, "refreshScrollNavLinks");

            testApp.linksComponent.ngAfterViewInit();
            tick(110);

            expect(refreshScrollNavLinksSpy).toHaveBeenCalledWith([], true);
        }));

        it('should call refreshScrollNavLinks if linkList changes', () => {
            let refreshScrollNavLinksSpy: jasmine.Spy = spyOn(testApp.linksComponent, "refreshScrollNavLinks");

            testApp.linksComponent.ngAfterViewInit();
            testApp.linksComponent['linkList'].notifyOnChanges();

            expect(refreshScrollNavLinksSpy).toHaveBeenCalledWith();
        });
    });

    describe('refreshScrollNavLinks', () => {
        it('should reset linkList if list of ScrollNavLinkDirectives are passed in', () => {
            let scrollNavLinkDirectives: ScrollNavLinkDirective[] = [new ScrollNavLinkDirective(testApp.fixture.nativeElement.querySelector(`[${SCROLL_LINK_ATTRIBUTE}]`), renderer)];
            let linkListResetSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'reset');
            let linkListNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'notifyOnChanges');

            testApp.linksComponent.refreshScrollNavLinks(scrollNavLinkDirectives);

            expect(linkListResetSpy).toHaveBeenCalledWith(scrollNavLinkDirectives);
            expect(linkListNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should add directives from linkList if hcScrollLink list has more links than linkList', () => {
            let scrollLinkElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_LINK_ATTRIBUTE}]`);
            let scrollLinkHTMLElements: HTMLElement[] = [];
            scrollLinkElements.forEach((element: HTMLElement) => {
                scrollLinkHTMLElements.push(element);
            });

            let newElement: HTMLElement = scrollLinkHTMLElements[0];
            newElement.setAttribute(SCROLL_LINK_ATTRIBUTE, "z1");
            scrollLinkHTMLElements.push(newElement);

            let linkListResetSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'reset').and.callThrough();
            let linkListNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.linksComponent._elementRef.nativeElement, 'querySelectorAll').and.returnValue(scrollLinkHTMLElements);

            testApp.linksComponent.refreshScrollNavLinks();

            expect(testApp.linksComponent._links.length).toEqual(9);
            expect(linkListResetSpy).toHaveBeenCalled();
            expect(linkListNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should remove directives from linkList if hcScrollLink list has fewer links than linkList', () => {
            let scrollLinkElement: Node = testApp.fixture.nativeElement.querySelector(`[${SCROLL_LINK_ATTRIBUTE}]`);
            (scrollLinkElement as HTMLElement).setAttribute(SCROLL_LINK_ATTRIBUTE, "z1");

            let linkListResetSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'reset').and.callThrough();
            let linkListNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.linksComponent._elementRef.nativeElement, 'querySelectorAll').and.returnValue([scrollLinkElement]);

            testApp.linksComponent.refreshScrollNavLinks();

            expect(testApp.linksComponent._links.length).toEqual(1);
            expect(linkListResetSpy).toHaveBeenCalled();
            expect(linkListNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should update directives from linkList if hcScrollLink list has different hcScrollLinks', () => {
            let scrollLinkElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_LINK_ATTRIBUTE}]`);
            (scrollLinkElements.item(0) as HTMLElement).setAttribute(SCROLL_LINK_ATTRIBUTE, "z1");

            let linkListResetSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'reset').and.callThrough();
            let linkListNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.linksComponent._elementRef.nativeElement, 'querySelectorAll').and.returnValue(scrollLinkElements);

            testApp.linksComponent.refreshScrollNavLinks();

            expect(testApp.linksComponent._links.length).toEqual(8);
            expect(testApp.linksComponent['linkList'].toArray()[0].hcScrollLink).toEqual("z1");
            expect(linkListResetSpy).toHaveBeenCalled();
            expect(linkListNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should not update directives from linkList if hcScrollLink list has the same hcScrollLinks', () => {
            let scrollLinkElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_LINK_ATTRIBUTE}]`);

            let linkListResetSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'reset').and.callThrough();
            let linkListNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.linksComponent['linkList'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.linksComponent._elementRef.nativeElement, 'querySelectorAll').and.returnValue(scrollLinkElements);

            testApp.linksComponent.refreshScrollNavLinks();

            expect(testApp.linksComponent._links.length).toEqual(8);
            expect(linkListResetSpy).not.toHaveBeenCalled();
            expect(linkListNotifyOnChangesSpy).not.toHaveBeenCalled();
        });

        describe('initial classes', () => {
            it('should add parent section class when children section(s) exist', () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[a1].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b1].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[a3].className.indexOf(PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it("should not add parent section class when children sections don't exist", () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[c1].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[c2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[b2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a2].className.indexOf(PARENT_SECTION_CLASS)).toEqual(-1);
            });

            it('should add active parent section class when link is a parent and has an active subsection', () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[a1].className.indexOf(ACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should not add active parent section class when link is a parent but is not active', () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[a3].className.indexOf(INACTIVE_PARENT_SECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should set subsection class when link has a parent section', () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[b1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[c1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[c1].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b2].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
                expect(testApp.linksComponent._links[b3].className.indexOf(SUBSECTION_CLASS)).toBeGreaterThan(-1);
            });

            it('should not set subsection class when link does not have a parent section', () => {
                testApp.linksComponent.refreshScrollNavLinks();

                expect(testApp.linksComponent._links[a1].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a2].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
                expect(testApp.linksComponent._links[a3].className.indexOf(SUBSECTION_CLASS)).toEqual(-1);
            });
        });

        describe("first link", () => {
            let setActiveSectionSpy: jasmine.Spy;

            beforeEach(() => {
                testApp.linksComponent._setActiveSectionById("a2");
                testApp.detectChanges();

                setActiveSectionSpy = spyOn(testApp.linksComponent, "_setActiveSectionById");
            });

            it('when isInit is true it should call _setActiveSectionById', () => {
                testApp.linksComponent.refreshScrollNavLinks([], true);

                expect(setActiveSectionSpy).toHaveBeenCalled();
            });

            it('when isInit is false it should not call _setActiveSectionById', () => {
                testApp.linksComponent.refreshScrollNavLinks([], false);

                expect(setActiveSectionSpy).not.toHaveBeenCalled();
            });
        });
    });
});
