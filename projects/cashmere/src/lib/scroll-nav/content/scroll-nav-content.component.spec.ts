import {fakeAsync, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {Component, Renderer2} from '@angular/core';
import {By} from '@angular/platform-browser';

import {HcScrollNavComponent} from '../nav/scroll-nav.component';
import {HcScrollNavContentComponent} from './scroll-nav-content.component';
import {ScrollNavModule} from '../scroll-nav.module';
import {take} from 'rxjs/operators';
import {ScrollNavTargetDirective} from './scroll-nav-target.directive';

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

            <hc-scroll-nav-content [nav]='ScrollNav' style="display: block; height: 100px;">
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
    `,
    standalone: false
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

const SCROLL_TARGET_ATTRIBUTE = 'hcScrollTarget';

describe('HcScrollNavContentComponent', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ScrollNavModule],
            declarations: [TestAppComponent],
            providers: [Renderer2]
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

    xit('should call _setActiveSectionById in nav when scrolling', (done) => {
        const setActiveSectionSpy: jasmine.Spy = spyOn(testApp.contentComponent.nav, '_setActiveSectionById');

        testApp.contentComponent._cdkScrollableElement
            .elementScrolled()
            .pipe(take(1))
            .subscribe(() => {
                expect(setActiveSectionSpy).toHaveBeenCalled();
                done();
            });

        testApp.contentComponent._cdkScrollableElement.scrollTo({top: 200, behavior: 'auto'});
    });

    describe('ngAfterViewInit', () => {
        describe('init', () => {
            it("should throw error if target doesn't have a id", fakeAsync(() => {
                spyOnProperty(testApp.contentComponent._scrollTargets[0], 'id').and.returnValue('');

                let error;
                try {
                    testApp.contentComponent.ngAfterViewInit();
                    tick(110);
                } catch (e) {
                    error = e;
                }

                const expectedError = new Error('hcScrollTarget element needs an id.');
                expect(error).toEqual(expectedError);
            }));

            it('should set minHeight on last target if targets change', fakeAsync(() => {
                testApp.contentComponent._scrollTargets.forEach((target) => {
                    target.style.minHeight = 'unset';
                });

                // set min height on second to last target
                testApp.contentComponent._scrollTargets[testApp.contentComponent._scrollTargets.length - 2].style.minHeight = '200px';

                testApp.detectChanges();
                testApp.contentComponent.ngAfterViewInit();
                tick(110);

                expect(testApp.contentComponent._scrollTargets[testApp.contentComponent._scrollTargets.length - 2].style.minHeight).toEqual('unset');
                expect(
                    testApp.contentComponent._scrollTargets[testApp.contentComponent._scrollTargets.length - 1].style.minHeight
                ).not.toEqual('unset');
            }));
        });

        it("should call refreshScrollNavTargets if hasDynamicContent is true", () => {
            const refreshScrollNavTargetsSpy: jasmine.Spy = spyOn(testApp.contentComponent, "refreshScrollNavTargets");
            testApp.contentComponent.hasDynamicContent = true;

            testApp.contentComponent.ngAfterViewInit();

            expect(refreshScrollNavTargetsSpy).toHaveBeenCalled();
        });
    });

    describe('refreshScrollNavTargets', () => {
        it('should reset targets if list of ScrollNavTargetDirectives are passed in', () => {
            const scrollNavLinkDirectives: ScrollNavTargetDirective[] =
                [new ScrollNavTargetDirective(testApp.fixture.nativeElement.querySelector(`[${SCROLL_TARGET_ATTRIBUTE}]`))];
            const targetsResetSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'reset');
            const targetNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'notifyOnChanges');

            testApp.contentComponent.refreshScrollNavTargets(scrollNavLinkDirectives);

            expect(targetsResetSpy).toHaveBeenCalledWith(scrollNavLinkDirectives);
            expect(targetNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should add directives from targets if hcScrollTarget list has more targets than targets', () => {
            const scrollTargetElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_TARGET_ATTRIBUTE}]`);
            const scrollTargetHTMLElements: HTMLElement[] = [];
            scrollTargetElements.forEach((element: HTMLElement) => {
                scrollTargetHTMLElements.push(element);
            });

            const newElement: Node | undefined = scrollTargetElements.item(0)?.cloneNode(true);
            if (newElement) {
                (newElement as HTMLElement).id = "z1";
                scrollTargetHTMLElements.push(newElement as HTMLElement);
            }

            const targetsResetSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'reset').and.callThrough();
            const targetsNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.contentComponent["_elementRef"].nativeElement, 'querySelectorAll').and.returnValue(scrollTargetHTMLElements);

            testApp.contentComponent.refreshScrollNavTargets();

            expect(testApp.contentComponent._scrollTargets.length).toEqual(9);
            expect(targetsResetSpy).toHaveBeenCalled();
            expect(targetsNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should remove directives from targets if hcScrollTarget list has fewer targets than targets', () => {
            const scrollTargetElement: Node = testApp.fixture.nativeElement.querySelector(`[${SCROLL_TARGET_ATTRIBUTE}]`).cloneNode(true);
            (scrollTargetElement as HTMLElement).id = "z1";

            const targetsResetSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'reset').and.callThrough();
            const targetsNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.contentComponent["_elementRef"].nativeElement, 'querySelectorAll').and.returnValue([scrollTargetElement]);

            testApp.contentComponent.refreshScrollNavTargets();

            expect(testApp.contentComponent._scrollTargets.length).toEqual(1);
            expect(targetsResetSpy).toHaveBeenCalled();
            expect(targetsNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should update directives from targets if hcScrollTarget list has different hcScrollTarget', () => {
            const scrollTargetElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_TARGET_ATTRIBUTE}]`);
            const newNodeArray: Node[] = [];
            scrollTargetElements.forEach((node) => {
                newNodeArray.push(node.cloneNode(true));
            });
            (newNodeArray[0] as HTMLElement).id = "z1";

            const targetsResetSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'reset').and.callThrough();
            const targetsNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.contentComponent["_elementRef"].nativeElement, 'querySelectorAll').and.returnValue(newNodeArray);

            testApp.contentComponent.refreshScrollNavTargets();

            expect(testApp.contentComponent._scrollTargets.length).toEqual(8);
            expect(testApp.contentComponent._scrollTargets[0].id).toEqual("z1");
            expect(targetsResetSpy).toHaveBeenCalled();
            expect(targetsNotifyOnChangesSpy).toHaveBeenCalled();
        });

        it('should not update directives from targets if hcScrollTarget list has the same hcScrollTargets', () => {
            const scrollTargetElements: NodeList = testApp.fixture.nativeElement.querySelectorAll(`[${SCROLL_TARGET_ATTRIBUTE}]`);

            const targetsResetSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'reset').and.callThrough();
            const targetsNotifyOnChangesSpy: jasmine.Spy = spyOn(testApp.contentComponent['targets'], 'notifyOnChanges').and.callThrough();

            spyOn(testApp.contentComponent["_elementRef"].nativeElement, 'querySelectorAll').and.returnValue(scrollTargetElements);

            testApp.contentComponent.refreshScrollNavTargets();

            expect(testApp.contentComponent._scrollTargets.length).toEqual(8);
            expect(targetsResetSpy).not.toHaveBeenCalled();
            expect(targetsNotifyOnChangesSpy).not.toHaveBeenCalled();
        });
    });
});
