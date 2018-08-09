import {Component, Inject, Input, Optional} from '@angular/core';
import {IAppSwitcherService} from '../../app-switcher/app-switcher-interfaces';

/** Navigation dropdown for small screen sizes */
@Component({
    selector: 'hc-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss']
})
export class NavbarMobileMenuComponent {
    public _yPos: string = '-100';

    /**
     * Enables app switcher capabilities
     *
     */
    // @Input() appSwitcher: string = 'true';

    constructor() {} /*@Optional()
        @Inject('IAppSwitcherService')
        public _appSwitcherService: IAppSwitcherService*/

    /** Show the component from view */
    show(): void {
        this._yPos = '0';
    }

    /** Hide the component from view */
    hide(): void {
        this._yPos = '-100';
    }
}
