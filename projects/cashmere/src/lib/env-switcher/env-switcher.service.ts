import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {IEnvSwitcherConfig, IMetadataEnvironmentService, IEnvironmentResponse, ENV_SWITCHER_CONFIG} from './env-switcher-interfaces';

/**
 * A metadata environment switcher service designed to work with the Health Catalyst DOS platform's MetadataDiscoveryService
 */
@Injectable()
export class EnvironmentSwitcherService implements IMetadataEnvironmentService {
    /** Uri of metadata service normalized to not have a version, because the env switcher is specifically meant to work w/ v3 */
    public get metadataServiceUri(): string { return this._metadataServiceUri; }
    private _metadataServiceUri: string;

    constructor(private http: HttpClient, @Inject(ENV_SWITCHER_CONFIG) private config: IEnvSwitcherConfig) {
        if (!config || !config.metadataServiceUri) {
            throw new Error(
                [
                    'Failed to initialize EnvironmentSwitcherService: invalid ENV_SWITCHER_CONFIG.',
                    'You must provide a config object with a `metadataServiceUri`.',
                    `(value provided: ${config ? config.metadataServiceUri : config})`
                ].join(' ')
            );
        }

        this._metadataServiceUri = this.normalizeUri(this.config.metadataServiceUri);
    }

    getEnvironments(): Observable<IEnvironmentResponse> {
        const url = `${this._metadataServiceUri}/v3/MetadataEnvironments`;
        return this.http.get<IEnvironmentResponse>(url, {withCredentials: true});
    }

    private normalizeUri(uri: string): string {
        return uri.replace(/\/(v\d+\/?)?$/, '');
    }
}
