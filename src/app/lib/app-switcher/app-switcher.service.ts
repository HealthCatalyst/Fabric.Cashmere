import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { getMockApplication } from './app-switcher-mock';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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

@Injectable()
export class AppSwitcherService {
    constructor(private http: HttpClient) { }

    public getApplications(): Observable<IDiscoveryApplication[]> {
        // return this.http.get<IDiscoveryApplication[]>('/src/lib/app-switcher/app-switcher-mock.json');
        return Observable.of(getMockApplication(9)).delay(500);
    }
}