import {HcIcon, IMetadataEnvironment} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'hc-environment-switcher-overview-example',
    templateUrl: 'environment-switcher-overview-example.component.html',
    styleUrls: ['environment-switcher-overview-example.component.scss'],
    standalone: false
})
export class EnvironmentSwitcherOverviewExampleComponent {
    username = 'Christine K.';
    navIcon: HcIcon = {fontSet: 'hc-icons', fontIcon: 'icon-catalyst-logo', fontSize: 37};
    listHeader: FormControl = new FormControl("Environments");

    selectedEnvironments = [1234];
    environmentOptions: Array<IMetadataEnvironment> = [
        {
            id: 1234,
            tenantCode: 'HCAT',
            name: 'Production',
            shortName: 'PROD',
            description: 'Live customer environment.',
            color: '#FFFFFF'
        },
        {
            id: 5678,
            tenantCode: 'HCAT',
            name: 'Development',
            shortName: 'DEV',
            description: 'Environment for building and testing new features.',
            color: '#E7C447'
        },
        {
            id: 9012,
            tenantCode: 'HCAT',
            name: 'Test',
            shortName: 'TEST',
            description: '',
            color: '#F13C45'
        }
    ];

    multipleSelectEnabled = true;
    newTabFeatureEnabled = true;
    envSwitcherDisabled = false;
    loading = false;
    loadFailed = false;
    eventOutput: {eventName: string; data: unknown};

    onUpdateEnvironments($event: Array<IMetadataEnvironment>): void {
        this.eventOutput = {eventName: 'updateEnvironments', data: $event};
    }

    onOpenInNewTab($event: IMetadataEnvironment): void {
        this.eventOutput = {eventName: 'openInNewTab', data: $event};
    }

    onReloadEnvironments(): void {
        this.eventOutput = {eventName: 'reloadEnvironments', data: ''};
    }
}
