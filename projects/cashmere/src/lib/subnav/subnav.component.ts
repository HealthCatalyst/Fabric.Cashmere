import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

/** Secondary navigation bar appearing below the primary navbar  */
@Component({
    selector: 'hc-subnav',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SubnavComponent {
    @HostBinding('class.hc-subnav')
    _hostClass = true;

    /** **DEPRECATED** Not compatible with notification banners, so you should set
     * the fixed position of the subnav and other header content within your app instead */
    @HostBinding('class.hc-subnav-fixed-top')
    @Input()
    public fixedTop = false;
}
