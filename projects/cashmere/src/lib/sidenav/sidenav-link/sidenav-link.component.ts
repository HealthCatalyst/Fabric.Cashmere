import {Component, Input, ContentChildren, QueryList} from '@angular/core';

/** Primary navigation links */
@Component({
    selector: 'hc-sidenav-link',
    templateUrl: 'sidenav-link.component.html',
    styleUrls: ['sidenav-link.component.scss']
})
export class SidenavLinkComponent {
    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    routerLink?: string;

    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    uri?: string;

    /** The Font Awesome icon to display to the left of the link */
    @Input()
    fontIcon?: string;

    /** The text to display */
    @Input()
    linkText: string;

    @ContentChildren(SidenavLinkComponent)
    private _children?: QueryList<SidenavLinkComponent>;

    get children() {
        if (!this._children) {
            return;
        }
        return this._children.filter(c => c !== this);
    }
}
