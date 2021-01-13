import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

/** Secondary navigation bar appearing below the primary navbar  */
@Component({
    selector: 'hc-subnav',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class SubnavComponent {
    @HostBinding('class.hc-subnav')
    _hostClass: boolean = true;

    /** **DEPRECATED** Not compatible with notification banners, so you should set
     * the fixed position of the subnav and other header content within your app instead */
    @HostBinding('class.hc-subnav-fixed-top')
    @Input()
    public fixedTop: boolean = false;

    constructor() {}
}
