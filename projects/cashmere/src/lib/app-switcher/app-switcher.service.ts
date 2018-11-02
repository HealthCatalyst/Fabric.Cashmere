import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {IAppSwitcherConfig, IAppSwitcherService, IDiscoveryRequest, APP_SWITCHER_CONFIG} from './app-switcher-interfaces';

@Injectable()
export class AppSwitcherService implements IAppSwitcherService {
    readonly allApplicationsUri: string;

    constructor(
        private http: HttpClient,
        @Inject(APP_SWITCHER_CONFIG)
        private config: IAppSwitcherConfig
    ) {
        this.allApplicationsUri = `${this.config.discoveryServiceUri}/apps`;
    }

    getApplications(): Observable<IDiscoveryRequest> {
        const url = `${this.config.discoveryServiceUri}/Services?$filter=DiscoveryType eq 'Application' and IsHidden eq false&$top=12`;
        return this.http.get<IDiscoveryRequest>(url, { withCredentials: true }) as any;
    }
}
