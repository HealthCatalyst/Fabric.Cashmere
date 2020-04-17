import {Component, ViewEncapsulation} from '@angular/core';

/** Navigation dropdown for small screen sizes */
@Component({
    selector: 'hc-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarMobileMenuComponent {
    public _yPos: string = '-100';
    constructor() {}

    /** Show the component from view */
    show(): void {
        this._yPos = '0';
    }

    /** Hide the component from view */
    hide(): void {
        this._yPos = '-100';
    }
}
