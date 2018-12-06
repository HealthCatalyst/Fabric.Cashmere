import {Component, Inject} from '@angular/core';
import {IAppSwitcherService, APP_SWITCHER_SERVICE} from '../app-switcher-interfaces';

@Component({
    selector: 'hc-app-switcher-links',
    templateUrl: './app-switcher-links.component.html',
    styleUrls: ['./app-switcher-links.component.scss']
})
export class AppSwitcherLinksComponent {
    constructor(@Inject(APP_SWITCHER_SERVICE) public _appSwitcherService: IAppSwitcherService) {}
}
