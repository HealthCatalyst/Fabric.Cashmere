import { Component, OnInit, Input, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IconModule } from '../../icon/icon.module';
import { IAppSwitcherService, IDiscoveryApplication } from '../../app-switcher/app-switcher-interfaces';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'hc-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, -100%, 0)'
            })),
            state('out', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
      ]
})
export class NavbarMenuComponent implements OnInit {

    public applications: IDiscoveryApplication[];
    public subscription: Subscription;

    private ngUnsubscribe: any = new Subject();

    menuState:string = 'in';

    @Input() appSwitcher: boolean = true;

    constructor( @Inject('IAppSwitcherService') public appSwitcherService: IAppSwitcherService ) { }

    ngOnInit() {
        this.subscription = this.appSwitcherService.getApplications()
            .takeUntil(this.ngUnsubscribe)
            .subscribe((response: any) => {
                this.applications = response.value;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    show(): void { this.menuState = 'out'; }

    hide(): void { this.menuState = 'in'; }
}
