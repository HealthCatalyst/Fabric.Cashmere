import {Observable, of} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface IDiscoveryApplication {
    ServiceName: string;
    FriendlyName: string;
    Description: string;
    BuildNumber: string | null;
    Version: number;
    DiscoveryServiceId: number | null;
    ServiceUrl: string;
    Heartbeat?: Date;
    IsHidden?: boolean;
    DiscoveryType: string;
    Icon: string;
}

export interface IDiscoveryRequest {
    value: IDiscoveryApplication[];
}

export interface IAppSwitcherService {
    allApplicationsUri: string;

    getApplications(): Observable<IDiscoveryRequest>;
}

export const APP_SWITCHER_SERVICE = new InjectionToken<IAppSwitcherService>('IAppSwitcherService');

export interface IAppSwitcherConfig {
    discoveryServiceUri: string;
}

export const APP_SWITCHER_CONFIG = new InjectionToken<IAppSwitcherConfig>('IAppSwitcherConfig');

export class MockAppSwitcherService implements IAppSwitcherService {
    allApplicationsUri: string;

    getApplications(): Observable<IDiscoveryRequest> {
        return of({value: []});
    }
}
