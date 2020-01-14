import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    OnDestroy
} from '@angular/core';
import {HcPopoverAnchorDirective} from '../pop/directives/popover-anchor.directive';
import {MoreItem} from './more-item';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
    /** Display name of current user */
    @Input()
    user: string = '';

    /** Url to application logo image file */
    @Input()
    appIcon: string = '';

    /** Url to brand icon image file */
    @Input()
    brandIcon: string = '';

    /** Router link triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = '';

    /** Fixes the position of navbar to the top of the page. *Default is false.* */
    @Input()
    fixedTop: boolean = false;

    @ContentChildren(NavbarMobileMenuComponent)
    _mobileMenu: QueryList<NavbarMobileMenuComponent>;

    @ContentChildren(NavbarLinkComponent)
    _navLinks: QueryList<NavbarLinkComponent>;

    @ViewChild('navbar') navbarContent: ElementRef;
    @ViewChild('navlinks') navContent: ElementRef;

    @ViewChild('moreLink')
    _navbarMore: HcPopoverAnchorDirective;

    private unsubscribe$ = new Subject<void>();

    private _menuOpen: boolean = false;
    private _linkWidths: Array<number> = [];
    private _linksTotalWidth: number = 0;
    public _collapse: boolean = false;
    public _moreList: Array<MoreItem> = [];

    @HostListener('window:resize')
    _navResize() {
        if (this._navbarMore) {
            this._navbarMore.closePopover();
        }

        this._moreList = [];
        this._collapse = false;

        // If links is zero the page is smaller than the first responsive breakpoint
        if (this.navbarContent.nativeElement.clientWidth <= 0) {
            return;
        }

        let linksContainerWidth: number = this.navContent.nativeElement.offsetWidth;
        let curLinks: number = 0;

        // Step through the links until we hit the end of the container, then collapse the
        // remaining into a more menu
        this._navLinks.forEach((t, i) => {
            curLinks += this._linkWidths[i];

            let moreWidth: number = this._linksTotalWidth > linksContainerWidth ? 116 : 0;
            if (curLinks + moreWidth < linksContainerWidth) {
                t.show();
            } else {
                t.hide();
                this._collapse = true;
                this._moreList.push({name: t.linkText, uri: t.uri});
            }
        });

        this.ref.detectChanges();
    }

    constructor(private ref: ChangeDetectorRef) {}

    /** Forces a recalculation of the navbar links to determine how many should be rolling into a More menu.
     * Call this if you've updated the contents of any navbar links. */
    refreshNavLinks() {
        this._collectNavLinkWidths();
        this._navResize();
    }

    private _collectNavLinkWidths() {
        this._linkWidths = [];
        this._linksTotalWidth = 0;
        this._navLinks.forEach(t => {
            const isHidden = t._hidden;
            t.show();
            this._linksTotalWidth += t._getWidth();
            this._linkWidths.push(t._getWidth());
            if (isHidden) {
                t.hide();
            }
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.refreshNavLinks();
        }, 100);

        // If links are added dynamically, recheck the navbar link sizing
        this._navLinks.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.refreshNavLinks());
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    _toggleMobileMenu() {
        if (this._mobileMenu.first) {
            if (this._menuOpen) {
                this._mobileMenu.first.hide();
                this._menuOpen = false;
            } else {
                this._mobileMenu.first.show();
                this._menuOpen = true;
            }
        }
    }

    _menuClick(event: any) {
        let clickTarget: string = event.target.outerHTML;

        // Verify that the click in the mobile menu came from a navigation item
        if (clickTarget.indexOf('hclistline') >= 0 && clickTarget.indexOf('menu-dropdown') === -1) {
            this._toggleMobileMenu();
        }
    }

    get _mobileMenuIcon(): string {
        return this._menuOpen ? 'fa-times' : 'fa-bars';
    }

    _moreClick() {
        if (this._navbarMore) {
            this._navbarMore.closePopover();
        }
    }
}
