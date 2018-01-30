import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { getMockApplication } from './app-switcher-mock';
import { IAppSwitcherService, IDiscoveryRequest, IAppSwitcherConfig } from './app-switcher-interfaces';

export class MockAppSwitcherService implements IAppSwitcherService {
    public readonly allApplicationsUri: string = '#';

    constructor() { }

    public getApplications(): Observable<IDiscoveryRequest> {
        return Observable.of({ value: getMockApplication(5) }).delay(500);
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
        return this.http.get<IDiscoveryRequest>(url);
    }
}