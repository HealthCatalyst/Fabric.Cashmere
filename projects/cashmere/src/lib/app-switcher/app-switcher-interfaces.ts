import {Observable, of} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface IDiscoveryApplication {
    /** Usually the name of the application */
    ServiceName: string;
    /** A formatted version of the name of the application */
    FriendlyName: string;
    /** A short description of the application */
    Description: string;
    /** Optional build number for the application */
    BuildNumber: string | null;
    /** Version number of the application */
    Version: number;
    /** The unique id for this application in the Discovery Service */
    DiscoveryServiceId: number | null;
    /** The url to link to for the application */
    ServiceUrl: string;
    /** The last successful ping of the application */
    Heartbeat?: Date;
    /** Whether the app should be displayed in the app switcher */
    IsHidden?: boolean;
    /** The type of element, usually `application` */
    DiscoveryType: string;
    /** The base64 encoded png or svg of the application icon */
    Icon: string;
}

export interface IDiscoveryRequest {
    value: IDiscoveryApplication[];
}

export interface IAppSwitcherService {
    /** Optional URL for a separate page the app switcher can link to with a complete list of all available applications */
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
        return of({
            value: [
                {
                    ServiceName: 'MyApp',
                    FriendlyName: 'My App',
                    Description: 'The currently showing app',
                    BuildNumber: '123',
                    Version: 1,
                    DiscoveryServiceId: 1,
                    ServiceUrl: 'http://myapp.com',
                    DiscoveryType: 'Application',
                    Icon: ''
                },
                {
                    ServiceName: 'AnotherApp',
                    FriendlyName: 'Another App',
                    Description: 'App we could switch to',
                    BuildNumber: '123',
                    Version: 1,
                    DiscoveryServiceId: 2,
                    ServiceUrl: 'http://anotherapp.com',
                    DiscoveryType: 'Application',
                    Icon: ''
                }
            ]
        });
    }
}
