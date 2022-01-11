import {takeUntil} from 'rxjs/operators';
import {Component, Inject, OnDestroy, OnInit, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {Subject, Observable} from 'rxjs';

import {IAppSwitcherService, IDiscoveryApplication, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';
import {WorkTrackerService} from '../shared/work-tracker.service';

/**
 * `hc-app-switcher` is typically included in a popover to display links to available apps from the Discovery Service
 */
@Component({
    selector: 'hc-app-switcher',
    templateUrl: './app-switcher.component.html',
    styleUrls: ['./app-switcher.component.scss'],
    host: {class: 'hc-app-switcher-container'},
    encapsulation: ViewEncapsulation.None
})
export class AppSwitcherComponent implements OnInit, OnDestroy {
    /** The array of applications pulled from the Discovery Service */
    public applications: IDiscoveryApplication[];

    /** Whether the app switcher is currently loading data from the Discovery Service */
    public loading: Observable<boolean>;

    /** Whether the load from the Discovery Service was successful */
    public loadFailed = false;

    private _iconHeight = 60;
    private _serviceName = '';
    private _version = '';

    private ngUnsubscribe = new Subject();

    /** Sets the height of the app thumbnail icons, width is auto (defaults to 60px) */
    @Input()
    get iconHeight(): number {
        return this._iconHeight;
    }

    set iconHeight(heightVal: number) {
        this._iconHeight = heightVal;
    }

    /** Used to disable switching for your own app. `serviceVersion` must also be set. */
    @Input()
    get serviceName(): string {
        return this._serviceName;
    }

    set serviceName(serviceNameVal: string) {
        this._serviceName = serviceNameVal;
    }

    /** Used to disable switching for your own app. `serviceName` must also be set. */
    @Input()
    get serviceVersion(): string | number {
        return this._version;
    }

    set serviceVersion(serviceVersionVal: string | number) {
        this._version = `${serviceVersionVal}`;
    }

    /** Event emitted when a user clicks an app in the app switcher */
    @Output()
    appClick = new EventEmitter<IDiscoveryApplication>();

    constructor(@Inject(APP_SWITCHER_SERVICE) public _appSwitcherService: IAppSwitcherService, private workTracker: WorkTrackerService) {}

    ngOnInit(): void {
        this.loadApplications();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    /** Manually loads all applications from the configured Discovery Service */
    public loadApplications(): void {
        try {
            this.loadApplicationFromDiscoveryService();
        } catch (error) {
            this.handleError(error);
        }
    }

    private loadApplicationFromDiscoveryService() {
        this.loading = this.workTracker.startObservable(() =>
            this._appSwitcherService
                .getApplications()
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    (response) => {
                        this.loadFailed = false;
                        this.applications = response.value;
                    },
                    (error) => {
                        this.handleError(error);
                    }
                )
        );
    }

    private handleError(error: Error) {
        console.error('Failed to load applications from the app switcher service.', error);
        this.loadFailed = true;
    }

    _linkIfNotMe(app: IDiscoveryApplication): string | null {
        return this._appIsMe(app) ? null : app.ServiceUrl;
    }

    _appIsMe(app: IDiscoveryApplication): boolean {
        return app.ServiceName === this.serviceName && `${app.Version}` === this.serviceVersion;
    }

    _appClick( app: IDiscoveryApplication ): void {
        this.appClick.emit( app );
    }
}
