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
    /** Image of brand icon */
    @Input()
    brandIcon: string = '';

    public applications: IDiscoveryApplication[];
    public subscription: Subscription;
    public brandBg = 'brand';

    private ngUnsubscribe: any = new Subject();

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

    buttonOn() {
        this.brandBg = 'brand brandOn';
    }

    buttonOff() {
        this.brandBg = 'brand';
    }
}
