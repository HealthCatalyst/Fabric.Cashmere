import {Component, HostBinding, Input} from '@angular/core';

/** Secondary navigation bar appearing below the primary navbar  */
@Component({
    selector: 'hc-subnav',
    template: `<ng-content></ng-content>`
})
export class SubnavComponent {
    @HostBinding('class.subnav') _hostClass: boolean = true;

    /** If true, statically positions the subnav below the navbar (stays pinned on scroll) */
    @HostBinding('class.fixed-top')
    @Input()
    public fixedTop: boolean = false;

    constructor() {}
}
