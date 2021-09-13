import {Component} from '@angular/core';
import {HcIcon, IMetadataEnvironment} from '@healthcatalyst/cashmere';

/**
 * @title Navbar app switcher with mobile menu example
 */
@Component({
    selector: 'hc-navbar-environment-switcher-example',
    templateUrl: 'navbar-environment-switcher-example.component.html',
    styleUrls: ['navbar-environment-switcher-example.component.scss']
})
export class NavbarEnvironmentSwitcherExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: "hc-icons", fontIcon: "hci-catalyst-logo", fontSize: 37};

    currentEnvironments = ['1234'];
    multipleSelectEnabled = true;
    newTabFeatureEnabled = true;
    envSwitcherDisabled = false;
    eventOutput: {eventName: string, data: unknown};

    onUpdateEnvironments($event: Array<IMetadataEnvironment>): void {
        this.eventOutput = { eventName: 'updateEnvironments', data: $event };
    }

    onOpenInNewTab($event: IMetadataEnvironment): void {
        this.eventOutput = { eventName: 'openInNewTab', data: $event };
    }
}
