import {Component, Input, ContentChildren, QueryList} from '@angular/core';

/** Primary navigation links */
@Component({
    selector: 'hc-sidenav-link',
    templateUrl: 'sidenav-link.component.html'
})
export class SidenavLinkComponent {
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
    children?: QueryList<SidenavLinkComponent>;
}
