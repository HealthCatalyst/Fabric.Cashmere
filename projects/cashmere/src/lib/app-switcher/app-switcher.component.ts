import {takeUntil} from 'rxjs/operators';
import {Component, Inject, OnDestroy, OnInit, Input} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

import {IAppSwitcherService, IDiscoveryApplication, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';

@Component({
    selector: 'hc-app-switcher',
    templateUrl: './app-switcher.component.html',
    styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit, OnDestroy {
    public applications: IDiscoveryApplication[];
    public subscription: Subscription;
    public brandBg = 'brand';
    private _iconHeight: Number = 100;

    private ngUnsubscribe: any = new Subject();

    /** Sets the height of the app thumbnail icons, width is auto (defaults to 100px) */
    @Input()
    get iconHeight(): Number {
        return this._iconHeight;
    }

    set iconHeight(heightVal: Number) {
        this._iconHeight = heightVal;
    }

    constructor(@Inject(APP_SWITCHER_SERVICE) public appSwitcherService: IAppSwitcherService) {}

    ngOnInit() {
        this.subscription = this.appSwitcherService
            .getApplications()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response: any) => {
                this.applications = response.value;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
