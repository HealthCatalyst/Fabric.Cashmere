import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ScrollNavLinkDirective } from "./scroll-nav-link.directive";
import { ScrollNavModule } from "../scroll-nav.module";

@Component({ "template": "" })
export class AbstractHcScrollLinkComponent {
  constructor(public renderer: Renderer2) {}
}

@Component({
    template: `
    <hc-scroll-nav #ScrollNav>
        <ul>
            <li hcScrollLink='a1'>
                Test 1
            </li>
        </ul>
    </hc-scroll-nav>
    <hc-scroll-nav-content [nav]='ScrollNav'>
        <section id='a1' hcScrollTarget>
            <h1>Test 1 Section</h1>
        </section>
    </hc-scroll-nav-content>`
})
export class ScrollNavLinkComponent extends AbstractHcScrollLinkComponent {
}

@Component({
    template: `<hc-scroll-nav #ScrollNav>
        <ul>
            <li [attr.hcScrollLink]='"a2"'>
                Test 1
            </li>
        </ul>
    </hc-scroll-nav>
    <hc-scroll-nav-content [nav]='ScrollNav'>
        <section [id]='"a2"' hcScrollTarget>
            <h1>Test 1 Section</h1>
        </section>
    </hc-scroll-nav-content>`
})
export class ScrollNavLinkDynamicComponent extends AbstractHcScrollLinkComponent {
}

describe("ScrollNavLinkDirective", (): void => {
    let scrollNavLinkComponent: ComponentFixture<ScrollNavLinkComponent>;
    let scrollNavLinkDynamicComponent: ComponentFixture<ScrollNavLinkDynamicComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            "declarations": [ScrollNavLinkComponent, ScrollNavLinkDynamicComponent],
            "imports": [ScrollNavModule],
            "providers": [Renderer2]
        });
        scrollNavLinkComponent = TestBed.createComponent(ScrollNavLinkComponent);
        scrollNavLinkDynamicComponent = TestBed.createComponent(ScrollNavLinkDynamicComponent);

        scrollNavLinkComponent.detectChanges();
        scrollNavLinkDynamicComponent.detectChanges();
    }));

    it("should create non-dynamic component", (): void => {
        expect(scrollNavLinkComponent).toBeTruthy();
    });

    it("should create dynamic component", (): void => {
        expect(scrollNavLinkDynamicComponent).toBeTruthy();
    });

    describe("when used in a non-dynamic component", (): void => {
        let directive: ScrollNavLinkDirective;

        beforeEach(() => {
            directive = scrollNavLinkComponent.debugElement.query(By.directive(ScrollNavLinkDirective))
                .injector.get(ScrollNavLinkDirective);
        });

        it("should use the default nativeElement", (): void => {
            expect(directive.nativeElement).toBeTruthy();
            expect(directive.nativeElement.getAttribute("hcScrollLink")).toMatch("a1");
        });

        it("should have hc-scroll-nav-link class", (): void => {
            expect(directive.nativeElement.className.includes("hc-scroll-nav-link")).toBeTruthy();
        });

        it("click should call scrollIntoView", (): void => {
            let contentElement: HTMLElement = scrollNavLinkComponent.debugElement.query(By.css("#a1")).nativeElement;
            spyOn(document, "getElementById").and.returnValue(contentElement);
            let scrollIntoViewSpy: jasmine.Spy = spyOn(contentElement, "scrollIntoView");

            directive.nativeElement.click();

            expect(scrollIntoViewSpy).toHaveBeenCalled();
        });
    });

    describe("when used in a dynamic component", (): void => {
        let directive: ScrollNavLinkDirective;

        beforeEach(() => {
            let node: Node = scrollNavLinkDynamicComponent.nativeElement.querySelector(`[hcscrolllink]`);

            directive = new ScrollNavLinkDirective(<ElementRef>{}, scrollNavLinkDynamicComponent.componentInstance.renderer);
            directive._setDirectiveToNode(node);

            scrollNavLinkDynamicComponent.detectChanges();
        });

        it("should have set the nativeElement", (): void => {
            expect(directive.nativeElement).toBeTruthy();
            expect(directive.nativeElement.getAttribute("hcScrollLink")).toMatch("a2");
        });

        it("should have hc-scroll-nav-link class", (): void => {
            expect(directive.nativeElement.className.includes("hc-scroll-nav-link")).toBeTruthy();
        });

        it("click should call scrollIntoView", (): void => {
            let scrollIntoViewSpy: jasmine.Spy = spyOn(scrollNavLinkDynamicComponent.nativeElement.querySelector(`#${directive.hcScrollLink}`), "scrollIntoView");

            directive.nativeElement.click();

            expect(scrollIntoViewSpy).toHaveBeenCalled();
        });
    });
});
