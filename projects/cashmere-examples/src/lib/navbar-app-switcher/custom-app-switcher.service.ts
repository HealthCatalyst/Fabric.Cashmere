import {Observable, Subject} from 'rxjs';
import {IDiscoveryRequest, IDiscoveryApplication} from '@healthcatalyst/cashmere';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * If your app has access to the Health Catalyst DiscoveryService, you won't need to implement a
 * custom app switcher service; for this example we are overriding the default behavior of the
 * app switcher
 */

const mockApplications: IDiscoveryApplication[] = [
    {
        ServiceName: 'Atlas4',
        Version: 1,
        DiscoveryServiceId: 13,
        ServiceUrl: '#',
        DiscoveryType: 'Application',
        Icon: '',
        FriendlyName: 'Atlas',
        Description: 'A web application for interacting with the EDW',
        BuildNumber: null
    },
    {
        ServiceName: 'Operations Console',
        Version: 1,
        DiscoveryServiceId: 14,
        ServiceUrl: '#',
        DiscoveryType: 'Application',
        Icon: '',
        FriendlyName: 'Operations Console',
        Description: 'An administrative console for EDW administrators',
        BuildNumber: null
    },
    {
        ServiceName: 'IDEA',
        Version: 1,
        DiscoveryServiceId: 1014,
        ServiceUrl: '#',
        DiscoveryType: 'Application',
        Icon: '',
        FriendlyName: 'IDEA',
        Description: 'A web application for collecting custom sets of data',
        BuildNumber: null
    }
];

@Injectable()
export class CustomAppSwitcherService {
    readonly allApplicationsUri = 'http://example.com/';
    appSubject: Subject<IDiscoveryRequest> = new Subject();

    constructor( private http: HttpClient ){
        // For this mock service we'll be loading the Cashmere base64 icons, an actual discovery service will already have them defined
        this.http.get('https://cashmere.healthcatalyst.net/assets/product-icons/Atlas.txt', {responseType: 'text'}).subscribe( atlasIcon => {
            this.http.get('https://cashmere.healthcatalyst.net/assets/product-icons/OpsConsole.txt', {responseType: 'text'}).subscribe( opsIcon => {
                this.http.get('https://cashmere.healthcatalyst.net/assets/product-icons/IDEA.txt', {responseType: 'text'}).subscribe( ideaIcon => {
                    const mockApps = mockApplications;
                    mockApps[0].Icon = atlasIcon;
                    mockApps[1].Icon = opsIcon;
                    mockApps[2].Icon = ideaIcon;

                    this.appSubject.next({value: mockApplications});
                    this.appSubject.complete();
                });
            });       
        });
    }

    getApplications(): Observable<IDiscoveryRequest> {
        return this.appSubject.asObservable();
    }
}
