import {Directive} from '@angular/core';

/** Apply this attribute directive to any element to have it projected into `hc-sidenav` as the body. */
@Directive({
    selector: '[hcSidenavBody]',
})
export class SidenavBodyDirective {
}
