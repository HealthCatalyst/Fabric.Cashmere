import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";

import { take } from "rxjs/operators";

import { CmNavScrollContentComponent } from "./nav-scroll-content.component";
import { CmNavScrollLinksComponent } from "../nav-scroll-links/nav-scroll-links.component";

describe("CmNavScrollContentComponent", () => {
  let contentComponent: CmNavScrollContentComponent;
  let contentFixture: ComponentFixture<CmNavScrollContentComponent>;

  let linksComponent: CmNavScrollLinksComponent;
  let linksFixture: ComponentFixture<CmNavScrollLinksComponent>;

  let navName: string = "TestNav";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      "declarations": [
        CmNavScrollContentComponent,
        CmNavScrollLinksComponent
      ],
      "imports": [
        ScrollDispatchModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    linksFixture = TestBed.createComponent(CmNavScrollLinksComponent);
    linksComponent = linksFixture.componentInstance;
    let linksElement: string =
      `<div class="cm-nav-scroll-links-container">
          <ul>
            <li><span class="hc-font-md">Test Link 1</span></li>
            <li><span class="hc-font-md">Test Link 2</span></li>
            <li><span class="hc-font-md">Test Link 3</span></li>
          </ul>
        </div>`;
    linksFixture.nativeElement.innerHTML = linksElement;
    linksComponent.navName = navName;
    linksFixture.detectChanges();

    contentFixture = TestBed.createComponent(CmNavScrollContentComponent);
    contentComponent = contentFixture.componentInstance;
    let contentElement: string =
      `<ul>
        <li>
          <h1 style="height=1000px">
              Test 1 content
          </h1>
        </li>
        <li>
          <h1 style="height=1000px">
            Test 2 content
          </h1>
        </li>
        <li>
          <h1 style="height=1000px">
            Test 3 content
          </h1>
        </li>
      </ul>`;
    contentFixture.nativeElement.querySelector(".cm-nav-scroll-content-container").innerHTML = contentElement;
    contentFixture.nativeElement.setAttribute("style", "height: 500px;");
    contentComponent.navScrollLinks = linksComponent;

    contentFixture.detectChanges();
  });

  it("should create a content component", () => {
    expect(contentComponent).toBeTruthy();
  });

  it("should create a link component", () => {
    expect(linksComponent).toBeTruthy();
  });

  it("should be a name on each 'li' element", () => {
    let liElements: HTMLElement[] = contentFixture.debugElement.nativeElement.getElementsByTagName("li");

    expect(liElements[0].getAttribute("name")).toMatch(`${navName}-0-content`);
    expect(liElements[1].getAttribute("name")).toMatch(`${navName}-1-content`);
    expect(liElements[2].getAttribute("name")).toMatch(`${navName}-2-content`);
  });

  it("should should call setActiveClassByName in navScrollLinks when scrolling", () => {
    let setActiveClassSpy: jasmine.Spy = spyOn(contentComponent.navScrollLinks, "setActiveClassByName");

    contentComponent.cdkScrollableElement.elementScrolled().pipe(take(1)).subscribe(() => {
      expect(setActiveClassSpy).toHaveBeenCalled();
    });

    let offsetTop: number = contentFixture.debugElement.nativeElement.querySelector(`li[name="${navName}-1-content"]`).offsetTop;
    contentComponent.cdkScrollableElement.scrollTo({ "top": offsetTop });
  });
});
