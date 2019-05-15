import { NgModule } from "@angular/core";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";

import { CmNavScrollContentComponent } from "./nav-scroll-content/nav-scroll-content.component";
import { CmNavScrollLinksComponent } from "./nav-scroll-links/nav-scroll-links.component";

@NgModule({
  "declarations": [
    CmNavScrollContentComponent,
    CmNavScrollLinksComponent
  ],
  "exports": [
    CmNavScrollContentComponent,
    CmNavScrollLinksComponent
  ],
  "imports": [
    ScrollDispatchModule
  ],
  "providers": [
  ]
})
export class NavScrollModule { }
