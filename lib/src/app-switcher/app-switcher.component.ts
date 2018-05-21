import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';

import {IAppSwitcherService, IDiscoveryApplication} from './app-switcher-interfaces';

@Component({
    selector: 'hc-app-switcher',
    templateUrl: './app-switcher.component.html',
    styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit, OnDestroy {
    public applications: IDiscoveryApplication[];
    public subscription: Subscription;
    public brandBg = 'brand';

    private ngUnsubscribe: any = new Subject();

    constructor(@Inject('IAppSwitcherService') public appSwitcherService: IAppSwitcherService) {}

    ngOnInit() {
        this.subscription = this.appSwitcherService
            .getApplications()
            .takeUntil(this.ngUnsubscribe)
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
