import {Component} from '@angular/core';
import {HcIcon, IDiscoveryApplication} from '@healthcatalyst/cashmere';

/**
 * @title Navbar app switcher with mobile menu example
 */
@Component({
    selector: 'hc-navbar-app-switcher-example',
    templateUrl: 'navbar-app-switcher-example.component.html',
    standalone: false
})
export class NavbarAppSwitcherExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: "hc-icons", fontIcon: "icon-catalyst-logo", fontSize: 37};
    switcherSelection = "None";

    /* These values should match what was registered with the discovery service. We're using Atlas as an example here. */
    currentAppName = 'Atlas4';
    currentAppVersion = '1';

    updateApp( app: IDiscoveryApplication ): void {
        this.switcherSelection = app.FriendlyName;
    }
}
