import {Directive} from '@angular/core';

/** Apply this attribute directive to any element to have it projected into `hc-sidenav` as a header. */
@Directive({
    selector: '[hcSidenavHeader]',
    standalone: false
})
export class SidenavHeaderDirective {
}
