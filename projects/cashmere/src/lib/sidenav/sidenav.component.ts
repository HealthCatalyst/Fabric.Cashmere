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
    providers: [{provide: Drawer, useClass: forwardRef(() => SidenavComponent)}],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('openState', [
            state(
                'open, open-instant',
                style({
                    transform: 'translate3d(0, 0, 0)',
                    visibility: 'visible'
                })
            ),
            state(
                'void',
                style({
                    'box-shadow': 'none',
                    visibility: 'hidden'
                })
            ),
            transition('void => open-instant', animate('0ms')),
            transition('void <=> open, open-instant => void', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
    ]
})
export class SidenavComponent extends Drawer implements OnInit {
    /** Display name of current user */
    @Input()
    user: IUser | null = null;

    readonly align = 'left';
    readonly mode = 'side';

    @HostBinding()
    tabindex = -1;
    @HostBinding('class.hc-drawer')
    _drawerClass = true;

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
    logoutReturnToCurrent: boolean = true;

    @ContentChildren(SidenavLinkComponent)
    _navLinks: QueryList<SidenavLinkComponent>;

    @ViewChild('navbar') navbarContent: ElementRef;

    private _logoReady: Subject<boolean> = new Subject();
    sidenavOpen: boolean = true;
    public _collapse: boolean = false;
    public _logoCondense: boolean = false;

    @HostListener('window:resize')
    _navResize() {
        // If links is zero the page is smaller than the first responsive breakpoint
        // if (this.navbarContent.nativeElement.clientWidth <= 0) {
        //     return;
        // }
        // this.ref.detectChanges();
    }

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {
        super(el);
    }

    ngOnInit() {
        this._logoReady.subscribe(() => {
            this._navResize();
        });
        this.toggleOpen();
    }

    appIconLoaded() {
        this._logoReady.next(true);
        this._logoReady.complete();
    }

    _toggleMobileMenu() {
        this.sidenavOpen = !this.sidenavOpen;
        // if (this._mobileMenu.first) {
        //     if (this._menuOpen) {
        //         this._mobileMenu.first.hide();
        //         this._menuOpen = false;
        //     } else {
        //         this._mobileMenu.first.show();
        //         this._menuOpen = true;
        //     }
        // }
    }

    _menuClick(event: any) {
        let clickTarget: string = event.target.outerHTML;

        // Verify that the click in the mobile menu came from a navigation item
        if (clickTarget.indexOf('hclistline') >= 0 && clickTarget.indexOf('menu-dropdown') === -1) {
            this._toggleMobileMenu();
        }
    }

    _logout() {
        let url = this.logoutUrl;
        if (this.logoutReturnToCurrent === true) {
            url += `?service=${window.location.href}`;
        }
        window.location.href = url;
    }

    get _mobileMenuIcon(): string {
        return this.sidenavOpen ? 'fa-times' : 'fa-bars';
    }
}

export interface IUser {
    name: string;
    avatar?: string;
}
