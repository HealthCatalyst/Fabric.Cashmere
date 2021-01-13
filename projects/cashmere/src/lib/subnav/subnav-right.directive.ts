import {Directive, HostBinding} from '@angular/core';

/** Can be added to a div or individual component to align it to the right side of the subnav  */
@Directive({
    selector: '[hcSubnavRight]'
})
export class SubnavRightDirective {
    @HostBinding('class.hc-subnav-right')
    _hostClass: boolean = true;
}
