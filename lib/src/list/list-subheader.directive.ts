import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[hcListSubheader]'
})
export class ListSubheaderDirective {
    @HostBinding('class.hc-list-subheader') subheader = true;
}
