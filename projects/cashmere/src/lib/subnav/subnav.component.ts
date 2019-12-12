import {Component, HostBinding, Input} from '@angular/core';

/** Secondary navigation bar appearing below the primary navbar  */
@Component({
    selector: 'hc-subnav',
    template: `
        <ng-content></ng-content>
    `
})
export class SubnavComponent {
    @HostBinding('class.hc-subnav')
    _hostClass: boolean = true;

    /**
     * @deprecated
     * @description Not compatible with notification banners, so you should set
     *  the fixed position of the subnav and other header content within your app instead
     * */
    @HostBinding('class.hc-subnav-fixed-top')
    @Input()
    public fixedTop: boolean = false;

    constructor() {}
}
