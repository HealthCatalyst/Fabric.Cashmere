import {Observable, of} from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface IMetadataEnvironment {
    /** unique identifier for the environment */
    id: string;
    /** identifier representing a given tenant (for example, a particular client) */
    tenantCode: string;
    /** full name of environment */
    environmentName: string;
    /** abbreviated environment name. used in environment badge ui element */
    environmentShortName: string;
    /** describes the environment */
    description: string;
    /** color associated with environment. use in environemnt badge ui element */
    color: string;
}

/** Extended version of metadata environment model ready for display in the environment switcher UI */
export interface IMetadataEnvironmentVM extends IMetadataEnvironment {
    badgeColorClass: string;
}

/** The shape of the response from MDS when environments are requested */
export interface IEnvironmentResponse {
    value: IMetadataEnvironment[];
}

/** Apps with a custom metadata environment service must use this interface */
export interface IMetadataEnvironmentService {
    getEnvironments(): Observable<IEnvironmentResponse>;
}

/** Helps with injecting a custom metadata environment service to be provided */
export const ENV_SWITCHER_SERVICE = new InjectionToken<IMetadataEnvironmentService>('IMetadataEnvironmentService');

/** If not using a custom metadata envrionment service, must supply a metadata service uri */
export interface IEnvSwitcherConfig {
    metadataServiceUri: string;
}

/** Helps with injecting env switcher configuration with MDS uri */
export const ENV_SWITCHER_CONFIG = new InjectionToken<IEnvSwitcherConfig>('IEnvSwitcherConfig');

/** Used for testing */
export class MockEnvSwitcherService implements IMetadataEnvironmentService {
    getEnvironments(): Observable<IEnvironmentResponse> {
        return of({
            value: [
                {
                    id: '1234',
                    tenantCode: "HCAT",
                    environmentName: "Production",
                    environmentShortName: "PROD",
                    description: "Live customer environment.",
                    color: "#FFFFFF"
                },{
                    id: '5678',
                    tenantCode: "HCAT",
                    environmentName: "Development",
                    environmentShortName: "DEV",
                    description: "Environment for building and testing new features.",
                    color: "#E7C447"
                },{
                    id: '9012',
                    tenantCode: "HCAT",
                    environmentName: "Stage",
                    environmentShortName: "STG",
                    description: "Environment for preparing for production.",
                    color: "#EEA2C0"
                }
            ]
        });
    }
}

/** map of color hex codes and their corresponding css classes. Allows UI to restrict which colors are used */
export const badgeColorClasses = {
    'ffffff': 'hc-env-color-white',
    '7acb91': 'hc-env-color-light-green',
    '00acac': 'hc-env-color-forest-green',
    '00a859': 'hc-env-color-green',
    'e7c447': 'hc-env-color-gold',
    'ebba82': 'hc-env-color-tan',
    'f89012': 'hc-env-color-orange',
    'f13c45': 'hc-env-color-red',
    'eea2C0': 'hc-env-color-pink',
    'a94c9d': 'hc-env-color-purple',
    '3194fe': 'hc-env-color-blue',
    'ace5ff': 'hc-env-color-light-blue'
}
