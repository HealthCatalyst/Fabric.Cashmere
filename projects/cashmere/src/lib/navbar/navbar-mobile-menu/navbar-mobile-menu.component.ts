import {takeUntil} from 'rxjs/operators';
import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {IAppSwitcherService, IDiscoveryApplication} from '../../app-switcher/app-switcher-interfaces';
import {Subject, Subscription} from 'rxjs';

@Component({
    selector: 'hc-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss']
})
export class NavbarMobileMenuComponent implements OnInit, OnDestroy {
    public applications: IDiscoveryApplication[];
    public subscription: Subscription;

    private ngUnsubscribe: any = new Subject();

    yPos: string = '-100';

    @Input() appSwitcher: string = 'true';

    constructor(@Inject('IAppSwitcherService') public appSwitcherService: IAppSwitcherService) {}

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

    show(): void {
        this.yPos = '0';
    }

    hide(): void {
        this.yPos = '-100';
    }
}
