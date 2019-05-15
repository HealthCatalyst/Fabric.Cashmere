import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ScrollingModule } from "@angular/cdk/scrolling";

import { CmNavScrollLinksComponent } from "./nav-scroll-links.component";
import { CmNavScrollContentComponent } from "../nav-scroll-content/nav-scroll-content.component";

describe("CmNavScrollLinksComponent", () => {
  let linksComponent: CmNavScrollLinksComponent;
  let linksFixture: ComponentFixture<CmNavScrollLinksComponent>;

  let contentComponent: CmNavScrollContentComponent;
  let contentFixture: ComponentFixture<CmNavScrollContentComponent>;

  let navName: string = "TestNav";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      "declarations": [
        CmNavScrollLinksComponent,
        CmNavScrollContentComponent
      ],
      "imports": [
        ScrollingModule
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

  it("should create a link component", () => {
    expect(linksComponent).toBeTruthy();
  });

  it("should create a content component", () => {
    expect(contentComponent).toBeTruthy();
  });

  it("should be a name on each 'li' element", () => {
    let liElements: HTMLElement[] = linksFixture.debugElement.nativeElement.getElementsByTagName("li");

    expect(liElements[0].getAttribute("name")).toMatch(`${navName}-0`);
    expect(liElements[1].getAttribute("name")).toMatch(`${navName}-1`);
    expect(liElements[2].getAttribute("name")).toMatch(`${navName}-2`);
  });

  it("should set first 'li' element to 'active'", () => {
    let firstListElement: HTMLElement = linksFixture.debugElement.nativeElement.querySelector("li");

    expect(firstListElement.className.indexOf("active")).toBeGreaterThanOrEqual(0);
  });

  it("setActiveByClassName should set passed in element to 'active'", () => {
    linksComponent.setActiveClassByName(`${navName}-1`);

    let liElements: HTMLElement[] = linksFixture.debugElement.nativeElement.getElementsByTagName("li");

    expect(liElements[0].className.indexOf("active")).toEqual(-1);
    expect(liElements[1].className.indexOf("active")).toBeGreaterThanOrEqual(0);
    expect(liElements[2].className.indexOf("active")).toEqual(-1);
  });

  it("clicking on nav link scrolls content", () => {
    let windowScrollSpy: jasmine.Spy = spyOn(contentFixture.debugElement.nativeElement.querySelector(`li[name="${navName}-1-content"]`), "scrollIntoView");

    linksFixture.debugElement.nativeElement.querySelector(`li[name="${navName}-1"]`).click();

    expect(windowScrollSpy).toHaveBeenCalled();
  });
});
