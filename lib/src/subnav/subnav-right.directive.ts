import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcSubnavRight]'
})
export class SubnavRightDirective {
    @HostBinding('class.subnav-right') true;
}
