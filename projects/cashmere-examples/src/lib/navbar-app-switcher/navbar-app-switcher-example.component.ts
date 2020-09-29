import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HcIcon, SelectChangeEvent} from '@healthcatalyst/cashmere';

/**
 * @title Navbar app switcher with mobile menu example
 */
@Component({
    selector: 'hc-navbar-app-switcher-example',
    templateUrl: 'navbar-app-switcher-example.component.html',
    styleUrls: ['navbar-app-switcher-example.component.scss']
})
export class NavbarAppSwitcherExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: "hc-icons", fontIcon: "hci-catalyst-logo", fontSize: 37};
    brandingVal = 'light';
    brandImg = './assets/MillrockLogo_light.png';

    // These values should match what was registered with the discovery service. We're using Atlas as an example here.
    currentAppName = 'Atlas4';
    currentAppVersion = '1';

    brandChange( brandStyle: SelectChangeEvent ) {
        this.brandingVal = brandStyle.value;
        this.brandImg = './assets/MillrockLogo_' + brandStyle.value + '.png';
    }
}
