import {Observable, of} from 'rxjs';

import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {getMockApplication} from './app-switcher-mock';
import {IAppSwitcherConfig, IAppSwitcherService, IDiscoveryRequest} from './app-switcher-interfaces';

export class MockAppSwitcherService implements IAppSwitcherService {
    public readonly allApplicationsUri: string = '#';

    constructor() {}

    public getApplications(): Observable<IDiscoveryRequest> {
        return of({value: getMockApplication(5)}).pipe(delay(500));
    }
}

@Injectable()
export class AppSwitcherService implements IAppSwitcherService {
    public readonly allApplicationsUri: string;

    constructor(private http: HttpClient, @Inject('IAppSwitcherConfig') private config: IAppSwitcherConfig) {
        this.allApplicationsUri = `${this.config.discoveryServiceUri}/apps`;
    }

    public getApplications(): Observable<IDiscoveryRequest> {
        const url = `${this.config.discoveryServiceUri}/v1/Services/?$filter=DiscoveryType eq 'Application' and IsHidden eq false&$top=12`;
        return this.http.get<IDiscoveryRequest>(url) as any;
    }
}
