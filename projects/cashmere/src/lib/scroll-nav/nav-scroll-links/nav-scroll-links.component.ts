import { Component, ElementRef, ViewEncapsulation, Renderer2, Input, AfterViewChecked  } from "@angular/core";
import { each } from "lodash-es";

@Component({
  "selector": "cm-nav-scroll-links",
  "encapsulation": ViewEncapsulation.None,
  "styleUrls": ["./nav-scroll-links.component.scss"],
  "templateUrl": "./nav-scroll-links.component.html"
})
export class CmNavScrollLinksComponent implements AfterViewChecked {
  @Input() public navName: string;
  private componentLoaded: boolean = false;
  private elementList: HTMLElement[] = [];

  constructor( public _elementRef: ElementRef, public renderer: Renderer2 ) {  }

  // using AfterViewChecked instead of OnInit because this.navName isn't loaded in OnInit
  public ngAfterViewChecked(): void {
    if (this.navName && !this.componentLoaded) { // need the check for componentLoaded because AfterViewChecked fires multiple times
      this.elementList = this._elementRef.nativeElement.querySelector("ul").children;
      each(this.elementList, (element, index) => {
        if (index === 0) {
          element.setAttribute("class", `${element.className} active`.trim());
        }

        element.setAttribute("name", `${this.navName}-${index}`);
        this.renderer.listen(element, "click", () => {
          this.onNavClick(element);
        });
      });

      this.componentLoaded = true;
    }
  }

  public setActiveClassByName(elementName: string): void {
    each(this.elementList, (element) => {
      if (element.getAttribute("name") === elementName) {
        this.setActiveClass(element);
      }
    });
  }

  private setActiveClass(element: HTMLElement): void {
    each(this.elementList, (e) => {
      let elementClass: string = e.className;
      if (elementClass.indexOf("active") >= 0) {
        elementClass = elementClass.replace("active", "").trim();
        e.setAttribute("class", elementClass);
      }
    });

    element.setAttribute("class", `${element.className} active`.trim());
  }

  private onNavClick(element: HTMLElement): void {
    this.setActiveClass(element);
    this.navigateToSection(element.getAttribute("name"));
  }

  private navigateToSection(name: string): void {
    document.getElementsByName(`${name}-content`)[0].scrollIntoView();
  }
}
