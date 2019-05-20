import { NgModule } from "@angular/core";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";

import { HcScrollNavContentComponent } from "./content/scroll-nav-content.component";
import { HcScrollNavComponent } from "./nav/scroll-nav.component";
import { ScrollNavTargetDirective } from "./content/scroll-nav-target.directive";
import { ScrollNavLinkDirective } from "./nav/scroll-nav-link.directive";

@NgModule({
  "declarations": [
    HcScrollNavContentComponent,
    HcScrollNavComponent,
    ScrollNavTargetDirective,
    ScrollNavLinkDirective
  ],
  "exports": [
    HcScrollNavContentComponent,
    HcScrollNavComponent,
    ScrollNavTargetDirective,
    ScrollNavLinkDirective
  ],
  "imports": [
    ScrollDispatchModule
  ],
  "providers": [
  ]
})
export class ScrollNavModule { }
