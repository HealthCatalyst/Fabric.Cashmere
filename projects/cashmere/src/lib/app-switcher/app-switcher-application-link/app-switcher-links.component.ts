import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {IAppSwitcherService, APP_SWITCHER_SERVICE} from '../app-switcher-interfaces';

/**
 * `hc-app-switcher-links` is used to link to an app switcher page from the navbar mobile menu
 */
@Component({
    selector: 'hc-app-switcher-links',
    templateUrl: './app-switcher-links.component.html',
    styleUrls: ['./app-switcher-links.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppSwitcherLinksComponent {
    constructor(@Inject(APP_SWITCHER_SERVICE) public _appSwitcherService: IAppSwitcherService) {}
}
