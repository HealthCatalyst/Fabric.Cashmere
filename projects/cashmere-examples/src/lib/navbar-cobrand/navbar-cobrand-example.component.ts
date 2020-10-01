import {Component} from '@angular/core';
import {HcIcon, SelectChangeEvent} from '@healthcatalyst/cashmere';

/**
 * @title Navbar Co-branding
 */
@Component({
    selector: 'hc-navbar-cobrand-example',
    templateUrl: 'navbar-cobrand-example.component.html',
    styleUrls: ['navbar-cobrand-example.component.scss']
})
export class NavbarCobrandExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: "hc-icons", fontIcon: "hci-catalyst-logo", fontSize: 37};
    brandingVal = 'light';
    brandImg = './assets/MillrockLogo_light.png';

    brandChange( brandStyle: SelectChangeEvent ) {
        this.brandingVal = brandStyle.value;
        this.brandImg = './assets/MillrockLogo_' + brandStyle.value + '.png';
    }
}
