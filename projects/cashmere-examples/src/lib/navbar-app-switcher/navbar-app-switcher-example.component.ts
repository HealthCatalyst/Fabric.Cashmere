import {Component} from '@angular/core';
import {HcIcon} from '@healthcatalyst/cashmere';

/**
 * @title Navbar app switcher with mobile menu example
 */
@Component({
    selector: 'hc-navbar-app-switcher-example',
    templateUrl: 'navbar-app-switcher-example.component.html'
})
export class NavbarAppSwitcherExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: "hc-icons", fontIcon: "hci-catalyst-logo", fontSize: 37};

    //These values should match what was registered with the discovery service. We're using Atlas as an example here.
    currentAppName = 'Atlas4';
    currentAppVersion = '0';
}
