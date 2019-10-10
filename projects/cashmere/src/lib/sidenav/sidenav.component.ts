import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subject} from 'rxjs';
import {SidenavLinkComponent} from './sidenav-link/sidenav-link.component';
import {Drawer} from '../drawer/index';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {

    @ViewChild('leftOverDrawer') drawer: Drawer;

    @Input() set mobileView(isMobileView: boolean) {
        this._mobileView = isMobileView;
        if (!isMobileView) {
            this.sidenavOpen = false;
        }
    }
    get mobileView() {
        return this._mobileView;
    }
    _mobileView = false;

    /** Display name of current user */
    @Input()
    user: IUser | null = null;

    readonly align = 'left';
    readonly mode = 'side';

    @HostBinding()
    tabindex = -1;

    @HostBinding('class.hc-sidenav')
    _sideNavClass = true;

    @Input()
    appName: string;

    /** Url to brand icon image file */
    @Input()
    brandIcon: string = '';

    /** Router link triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = '';

    /** Base URL to be used for logging out */
    @Input()
    logoutUrl: string;

    /** Whether the logout url should append on a parameter to the current page. Default true */
    @Input()
    logoutReturnToCurrent = true;

    /** Icon to be used for the logout link */
    @Input()
    logoutIcon: string = 'fa-sign-out';

    @ContentChildren(SidenavLinkComponent)
    _navLinks: QueryList<SidenavLinkComponent>;

    @ViewChild('navbar') navbarContent: ElementRef;

    sidenavOpen = false;

    constructor() {}

    ngOnInit() {}

    _logout() {
        let url = this.logoutUrl;
        if (this.logoutReturnToCurrent) {
            url += `?service=${window.location.href}`;
        }
        window.location.href = url;
    }

    get _mobileMenuIcon(): string {
        return this.sidenavOpen ? 'fa-times-circle' : 'fa-bars';
    }

    triggerSidenavToggle(event) {
        event.stopPropagation();
        this.toggleSidenav(event);
    }

    dismissSidenavWhenOpen(event) {
        if (this.sidenavOpen) {
            event.stopPropagation();
            this.toggleSidenav(event);
        }
    }

    /**
     * Toggles the sidenav state.
     *
     * NOTE: Private to force template to call other methods that will decide when to toggle and when to stopPropagation.
     * This method is strictly the how of toggling not the entry point.
     */
    private toggleSidenav(event) {
        this.drawer.toggle();
        this.sidenavOpen = !this.sidenavOpen;
    }
}

export interface IUser {
    name: string;
    avatar?: string;
}
