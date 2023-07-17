import { Component, ElementRef, Renderer2 } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ScrollNavTargetDirective } from "./scroll-nav-target.directive";
import { ScrollNavModule } from "../scroll-nav.module";

@Component({ "template": "" })
export class AbstractHcScrollTargetComponent {
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
export class ScrollNavTargetComponent extends AbstractHcScrollTargetComponent {
}

@Component({
    template: `<hc-scroll-nav #ScrollNav>
        <ul>
            <li hcScrollLink='a2'>
                Test 1
            </li>
        </ul>
    </hc-scroll-nav>
    <hc-scroll-nav-content [nav]='ScrollNav'>
        <section [id]='"a2"' [attr.hcScrollTarget]="showContent">
            <h1>Test 1 Section</h1>
        </section>
    </hc-scroll-nav-content>`
})
export class ScrollNavTargetDynamicComponent extends AbstractHcScrollTargetComponent {
    public showContent = true;
}

describe("ScrollNavTargetDirective", (): void => {
    let scrollNavTargetComponent: ComponentFixture<ScrollNavTargetComponent>;
    let scrollNavTargetDynamicComponent: ComponentFixture<ScrollNavTargetDynamicComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            "declarations": [ScrollNavTargetComponent, ScrollNavTargetDynamicComponent],
            "imports": [ScrollNavModule],
            "providers": [Renderer2]
        });
        scrollNavTargetComponent = TestBed.createComponent(ScrollNavTargetComponent);
        scrollNavTargetDynamicComponent = TestBed.createComponent(ScrollNavTargetDynamicComponent);

        scrollNavTargetComponent.detectChanges();
        scrollNavTargetDynamicComponent.detectChanges();
    }));

    it("should create non-dynamic component", (): void => {
        expect(scrollNavTargetComponent).toBeTruthy();
    });

    it("should create dynamic component", (): void => {
        expect(scrollNavTargetDynamicComponent).toBeTruthy();
    });

    describe("when used in a non-dynamic component", (): void => {
        let directive: ScrollNavTargetDirective;

        beforeEach(() => {
            directive = scrollNavTargetComponent.debugElement.query(By.directive(ScrollNavTargetDirective))
                .injector.get(ScrollNavTargetDirective);
        });

        it("should use the default nativeElement", (): void => {
            expect(directive.nativeElement).toBeTruthy();
            expect(directive.nativeElement.id).toMatch("a1");
        });

        it("should have hc-scroll-nav-target class", (): void => {
            expect(directive.nativeElement.className.includes("hc-scroll-nav-target")).toBeTruthy();
        });
    });

    describe("when used in a dynamic component", (): void => {
        let directive: ScrollNavTargetDirective;

        beforeEach(() => {
            const node: Node = scrollNavTargetDynamicComponent.nativeElement.querySelector(`[hcscrolltarget]`);

            directive = new ScrollNavTargetDirective(<ElementRef>{});
            directive._setDirectiveToNode(node);

            scrollNavTargetDynamicComponent.detectChanges();
        });

        it("should have set the nativeElement", (): void => {
            expect(directive.nativeElement).toBeTruthy();
            expect(directive.nativeElement.id).toMatch("a2");
        });

        it("should have hc-scroll-nav-target class", (): void => {
            expect(directive.nativeElement.className.includes("hc-scroll-nav-target")).toBeTruthy();
        });
    });
});
