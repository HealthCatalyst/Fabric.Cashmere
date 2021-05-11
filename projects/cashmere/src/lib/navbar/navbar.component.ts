import {
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
    ViewEncapsulation,
    OnDestroy
} from '@angular/core';
import type {QueryList} from '@angular/core';
import {HcPopoverAnchorDirective} from '../pop/directives/popover-anchor.directive';
import {HcPopComponent} from '../pop/popover.component';
import {MoreItem} from './more-item';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HcIcon} from '../icon/icon.component';
import {NavbarDropdownComponent} from './navbar-dropdown/navbar-dropdown.component';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnDestroy {
    /** Display name of current user */
    @Input()
    user = '';

    /** Url to application logo image file */
    @Input()
    appIcon = '';

    /** Either url to brand icon image file or HcIcon object for a font glyph */
    @Input()
    brandIcon: string | HcIcon = '';

    /** Router link triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = '';

    /** Fixes the position of navbar to the top of the page. *Default is false.* */
    @Input()
    fixedTop = false;

    @ContentChildren(NavbarMobileMenuComponent)
    _mobileMenu: QueryList<NavbarMobileMenuComponent>;

    @ContentChildren(NavbarLinkComponent)
    _navLinks: QueryList<NavbarLinkComponent | NavbarDropdownComponent>;

    @ViewChild('navbar') navbarContent: ElementRef;
    @ViewChild('navlinks') navContent: ElementRef;

    @ViewChild('moreLink')
    _navbarMore: HcPopoverAnchorDirective;

    @ViewChild('navbarMore')
    _morePop: HcPopComponent;

    private unsubscribe$ = new Subject<void>();

    private _menuOpen = false;
    private _linkWidths: Array<number> = [];
    private _linksTotalWidth = 0;
    public _collapse = false;
    public _moreList: Array<MoreItem> = [];

    /** Runs the initial calculation of navlink widths after the page has fully rendered */
    @HostListener('window:load')
    _setupNavLinks() {
        this.refreshNavLinks();

        // If links are added dynamically, recheck the navbar link sizing
        this._navLinks.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.refreshNavLinks());
    }

    /** Forces a recalculation of the navbar links to determine how many should be rolling into a More menu.
     * Call this if you've updated the contents of any navbar links. */
    @HostListener('window:resize')
    refreshNavLinks() {
        if (this._navbarMore) {
            this._navbarMore.closePopover();
        }
        if ( this._linksTotalWidth === 0 || this._linkWidths.length !== this._navLinks.length ) {
            this._collectNavLinkWidths();
        }

        this._moreList = [];
        this._collapse = false;

        // If links is zero the page is smaller than the first responsive breakpoint
        if (this.navbarContent.nativeElement.clientWidth <= 0) {
            return;
        }

        const linksContainerWidth: number = this.navContent.nativeElement.offsetWidth;
        let curLinks = 0;

        // Step through the links until we hit the end of the container, then collapse the
        // remaining into a more menu
        this._navLinks.forEach((t, i) => {
            curLinks += this._linkWidths[i];

            const moreWidth: number = this._linksTotalWidth > linksContainerWidth ? 116 : 0;
            if (curLinks + moreWidth < linksContainerWidth) {
                t.show();
                // Reset the parent and positioning of any dropdown popovers that aren't in the More menu
                const tempDrop = t as NavbarDropdownComponent;
                if ( tempDrop._menuPop ) {
                    tempDrop._menuPop.horizontalAlign = 'start';
                    tempDrop._menuPop.verticalAlign = 'below';
                    tempDrop._menuPop.parent = null;
                }
            } else {
                t.hide();
                this._collapse = true;
                const tempDrop = t as NavbarDropdownComponent;
                // Translate any navbar dropdown menus into secondary menus in the More dropdown
                if ( tempDrop._menuPop ) {
                    tempDrop._menuPop.horizontalAlign = 'after';
                    tempDrop._menuPop.verticalAlign = 'start';
                    tempDrop._menuPop.parent = this._morePop;
                    this._moreList.push({name: t.linkText, uri: t.uri, dropdown: tempDrop._menuPop});
                } else {
                    this._moreList.push({name: t.linkText, uri: t.uri});
                }
            }
        });

        this.ref.detectChanges();
    }

    constructor(private ref: ChangeDetectorRef) {}

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

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    _toggleMobileMenu() {
        if (this._menuOpen) {
            this._mobileMenu.first.hide();
            this._menuOpen = false;
        } else {
            this._mobileMenu.first.show();
            this._menuOpen = true;
        }
    }

    _menuClick(event: any) {
        const clickTarget: string = event.target.outerHTML;

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

    _brandIconType(): string {
        return typeof this.brandIcon;
    }

    _brandIconSet(): string {
        if (this.brandIcon && typeof this.brandIcon !== 'string') {
            return this.brandIcon.fontSet;
        } else {
            return '';
        }
    }

    _brandIconGlyph(): string {
        if (this.brandIcon && typeof this.brandIcon !== 'string') {
            return this.brandIcon.fontIcon;
        } else {
            return '';
        }
    }

    _brandIconSize(): string {
        if (this.brandIcon && typeof this.brandIcon !== 'string' && this.brandIcon.fontSize) {
            return this.brandIcon.fontSize + 'px';
        }
        return '37px';
    }
}
