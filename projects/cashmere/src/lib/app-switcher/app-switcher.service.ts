import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {IAppSwitcherConfig, IAppSwitcherService, IDiscoveryRequest, APP_SWITCHER_CONFIG} from './app-switcher-interfaces';

/**
 * An app switcher service designed to work with the Health Catalyst DOS platform's DiscoveryService
 */
@Injectable()
export class AppSwitcherService implements IAppSwitcherService {
    readonly allApplicationsUri: string;
    private readonly discoveryServiceUri: string;

    constructor(private http: HttpClient, @Inject(APP_SWITCHER_CONFIG) private config: IAppSwitcherConfig) {
        if (!config || !config.discoveryServiceUri) {
            throw new Error(
                [
                    'Failed to initialize AppSwitcherService: invalid APP_SWITCHER_CONFIG.',
                    'You must provide a config object with a `discoveryServiceUri`.',
                    `(value provided: ${config ? config.discoveryServiceUri : config})`
                ].join(' ')
            );
        }

        this.discoveryServiceUri = this.normalizeUri(this.config.discoveryServiceUri);
        this.allApplicationsUri = `${this.discoveryServiceUri}/apps`;
    }

    getApplications(): Observable<IDiscoveryRequest> {
        const url = `${this.discoveryServiceUri}/v1/Services?$filter=DiscoveryType eq 'Application' and IsHidden eq false&$top=12`;
        return this.http.get<IDiscoveryRequest>(url, {withCredentials: true});
    }

    private normalizeUri(uri: string): string {
        return uri.replace(/\/(v\d+\/?)?$/, '');
    }
}
