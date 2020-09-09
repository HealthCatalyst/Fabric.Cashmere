import {takeUntil} from 'rxjs/operators';
import {Component, Inject, OnDestroy, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Subject, Subscription, Observable} from 'rxjs';

import {IAppSwitcherService, IDiscoveryApplication, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';
import {WorkTrackerService} from '../shared/work-tracker.service';

@Component({
    selector: 'hc-app-switcher',
    templateUrl: './app-switcher.component.html',
    styleUrls: ['./app-switcher.component.scss'],
    // tslint:disable-next-line: no-host-metadata-property
    host: {class: 'hc-app-switcher-container'},
    encapsulation: ViewEncapsulation.None
})
export class AppSwitcherComponent implements OnInit, OnDestroy {
    public applications: IDiscoveryApplication[];
    public subscription: Subscription;
    public brandBg = 'brand';
    public loading: Observable<boolean>;
    public loadFailed = false;
    private _iconHeight: number = 60;
    private _serviceName: string = '';
    private _version: string = '';

    private ngUnsubscribe: any = new Subject();

    /** Sets the height of the app thumbnail icons, width is auto (defaults to 100px) */
    @Input()
    get iconHeight(): number {
        return this._iconHeight;
    }

    set iconHeight(heightVal: number) {
        this._iconHeight = heightVal;
    }

    @Input()
    get serviceName(): string {
        return this._serviceName;
    }

    set serviceName(serviceNameVal: string) {
        this._serviceName = serviceNameVal;
    }
    @Input()
    get serviceVersion(): string | number {
        return this._version;
    }

    set serviceVersion(serviceVersionVal: string | number) {
        this._version = `${serviceVersionVal}`;
    }
    constructor(@Inject(APP_SWITCHER_SERVICE) public appSwitcherService: IAppSwitcherService, private workTracker: WorkTrackerService) {}

    ngOnInit() {
        this.loadApplications();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public loadApplications() {
        try {
            this.loadApplicationFromDiscoveryService();
        } catch (error) {
            this.handleError(error);
        }
    }

    private loadApplicationFromDiscoveryService() {
        this.loading = this.workTracker.startObservable(() =>
            this.appSwitcherService
                .getApplications()
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    (response: any) => {
                        this.loadFailed = false;
                        this.applications = response.value;
                    },
                    (error: any) => {
                        this.handleError(error);
                    }
                )
        );
    }

    private handleError(error: any) {
        console.error('Failed to load applications from the app switcher service.', error);
        this.loadFailed = true;
    }

    linkIfNotMe(app): string {
        return this.appIsMe(app) ? null : app.ServiceUrl;
    }

    appIsMe(app: IDiscoveryApplication) {
        return app.ServiceName === this.serviceName && `${app.Version}` === this.serviceVersion;
    }
}
