import {Injectable} from '@angular/core';
import {of, Observable} from 'rxjs';
import {IMetadataEnvironmentService, IEnvironmentResponse, IMetadataEnvironment} from '@healthcatalyst/cashmere';

/**
 * If your app has access to the Health Catalyst MetaData Service, you may not need to implement a
 * custom environment switcher service; for this example we are overriding the default behavior of the
 * env switcher
 */
const mockEnvs: IMetadataEnvironment[] = [
    {
        id: 1234,
        tenantCode: "HCAT",
        name: "Production",
        shortName: "PROD",
        description: "Live customer environment.",
        color: "#FFFFFF"
    },{
        id: 5678,
        tenantCode: "HCAT",
        name: "Development",
        shortName: "DEV",
        description: "Environment for building and testing new features.",
        color: "#E7C447"
    },{
        id: 9012,
        tenantCode: "HCAT",
        name: "Test",
        shortName: "TEST",
        description: "Environment for integration testing.",
        color: "#F13C45"
    }
];

@Injectable()
export class CustomEnvSwitcherService implements IMetadataEnvironmentService {
    getEnvironments(): Observable<IEnvironmentResponse> {
        return of({ value: mockEnvs });
    }
}
