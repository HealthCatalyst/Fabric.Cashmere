import { Observable } from 'rxjs/Observable';

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

    getApplications(): Observable<IDiscoveryRequest>
}

export interface IAppSwitcherConfig {
    discoveryServiceUri: string;
}
