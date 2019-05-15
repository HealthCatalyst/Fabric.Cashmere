import { Component, ElementRef, ViewEncapsulation, Input, AfterViewChecked, AfterViewInit, ViewChild, OnDestroy, EventEmitter, Output } from "@angular/core";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { each } from "lodash-es";
import { Subscription } from "rxjs";
import { CmNavScrollLinksComponent } from "../nav-scroll-links/nav-scroll-links.component";

@Component({
  "selector": "cm-nav-scroll-content",
  "encapsulation": ViewEncapsulation.None,
  "styleUrls": ["./nav-scroll-content.component.scss"],
  "templateUrl": "./nav-scroll-content.component.html"
})
export class CmNavScrollContentComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @Input() public navScrollLinks: CmNavScrollLinksComponent;
  @Input() public containerHeight: string = ""; // must have unit i.e. 100vh or 100px
  @Output() public sectionInView: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(CdkScrollable) public cdkScrollableElement: CdkScrollable;

  private componentLoaded: boolean = false;
  private cdkScrollableElementSubscription: Subscription;
  private offsetList: any[] = [];

  constructor( private _elementRef: ElementRef ) {  }

  public ngOnDestroy(): void {
    if (this.cdkScrollableElementSubscription) {
      this.cdkScrollableElementSubscription.unsubscribe();
    }
  }

  public ngAfterViewInit(): void {
    if (this.cdkScrollableElement) {
      this.cdkScrollableElementSubscription = this.cdkScrollableElement.elementScrolled().subscribe(() => {
        this.onScroll();
      });
    }
  }

  // using AfterViewChecked instead of OnInit because this.navName isn't loaded in OnInit
  public ngAfterViewChecked(): void {
    if (this.navScrollLinks.navName && !this.componentLoaded) { // need the check for componentLoaded because AfterViewChecked fires multiple times
      let elementList: HTMLElement[] = this._elementRef.nativeElement.querySelector("ul").children;
      each(elementList, (value, index) => {
        let elementName: string = `${this.navScrollLinks.navName}-${index}`;
        value.setAttribute("name", `${elementName}-content`);
        this.offsetList.push({ "name": elementName, "offset": value.offsetTop });

        if ((this.containerHeight) && (index === elementList.length - 1)) {
          if (value.getAttribute("style")) {
            value.setAttribute("style", `${value.getAttribute("style")} min-height: ${this.containerHeight};`);
          } else {
            value.setAttribute("style", `min-height: ${this.containerHeight};`);
          }
        }
      });

      this.componentLoaded = true;
    }
  }

  private onScroll(): void {
    let offset: number = this.cdkScrollableElement.measureScrollOffset("top") + this.offsetList[0].offset;

    each(this.offsetList, (value, index) => {
      let initialOffset: number = undefined;
      let nextOffset: number = undefined;

      if (index > 0) {
        initialOffset = value.offset;
      }
      if (index + 1 < this.offsetList.length) {
        nextOffset = this.offsetList[index + 1].offset;
      }

      if ((initialOffset && nextOffset && ((offset >= initialOffset) && (offset < nextOffset))) ||
          (initialOffset && !nextOffset && offset >= initialOffset) ||
          (!initialOffset && nextOffset && offset < nextOffset)) {
            this.setActiveClass(value.name);
          }
    });
  }

  private setActiveClass(sectionInView: string): void {
    this.navScrollLinks.setActiveClassByName(sectionInView);
  }
}
