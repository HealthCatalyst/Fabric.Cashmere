import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {forkJoin, Subject} from 'rxjs';
import {HcPopoverAnchorDirective} from '../pop/directives/popover-anchor.directive';
import {MoreItem} from './more-item';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, AfterViewInit, AfterContentInit {
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
    @ViewChild('rightcontainer') rightContent: ElementRef;
    @ViewChild('navlinks') navContent: ElementRef;

    @ViewChild('moreLink')
    _navbarMore: HcPopoverAnchorDirective;

    private _logoReady: Subject<boolean> = new Subject();
    private _navLinksReady: Subject<boolean> = new Subject();
    private _rightLinksReady: Subject<boolean> = new Subject();
    private _menuOpen: boolean = false;
    private _linkWidths: Array<number> = [];
    private _rightWidth: number = 0;
    private _linksMax: number = 0;
    private _logoWidth: number = 0;
    public _collapse: boolean = false;
    public _logoCondense: boolean = false;
    public _moreList: Array<MoreItem> = [];

    @HostListener('window:resize')
    _navResize() {
        if (this._navbarMore) {
            this._navbarMore.closePopover();
        }
        this._moreList = [];

        // If links is zero the page is smaller than the first responsive breakpoint
        if (this.navbarContent.nativeElement.clientWidth <= 0) {
            return;
        }

        // Figure out all the relevant element widths
        this._collectNavLinkWidths();
        this._setRightContainerWidth();

        const navbarWidth: number = this.navbarContent.nativeElement.scrollWidth;
        const icons: number = this._rightWidth;
        const more: number = 116;
        const switcher: number = 55;
        let links: number = this._linksMax;
        const logoWidth = this._logoWidth;
        const condensedLogoWidth = logoWidth - 50;
        const regularWidth = switcher + logoWidth + links + icons;
        const condensedWidth = switcher + condensedLogoWidth + links + more + icons;

        if (navbarWidth <= regularWidth) {
            this._logoCondense = true;
            let tempArray = this._navLinks.toArray();
            tempArray.reverse();

            if (navbarWidth <= condensedWidth) {
                this._collapse = true;
                tempArray[0].hide();
                links -= this._linkWidths[0];
                this._moreList.push({name: tempArray[0].linkText, uri: tempArray[0].uri} as MoreItem);

                for (let i = 1; i < tempArray.length; i++) {
                    if (navbarWidth <= switcher + condensedLogoWidth + links + icons + more) {
                        tempArray[i].hide();
                        links -= this._linkWidths[i];
                        this._moreList.push({name: tempArray[i].linkText, uri: tempArray[i].uri});
                    } else {
                        tempArray[i].show();
                    }
                }

                this._moreList.reverse();
            } else {
                this._collapse = false;
                this._navLinks.forEach(t => t.show());
            }
        } else {
            this._collapse = false;
            this._logoCondense = false;
            this._navLinks.forEach(t => t.show());
        }
        this.ref.detectChanges();
    }

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {}

    private _setRightContainerWidth() {
        if (this._rightWidth === 0) {
            this._rightWidth = this.rightContent.nativeElement.scrollWidth;
        }
    }

    private _collectNavLinkWidths() {
        if (this._linkWidths.length === 0 || this._linkWidths.every(linkWidth => linkWidth === 0)) {
            this._linkWidths = [];
            this._navLinks.forEach(t => {
                this._linksMax += t._getWidth();
                this._linkWidths.push(t._getWidth());
            });
            this._linkWidths.reverse();
        }
    }

    ngOnInit() {
        forkJoin([this._logoReady, this._navLinksReady, this._rightLinksReady]).subscribe(() => {
            this._navResize();
        });
        if (!this.appIcon) {
            this.appIconLoaded();
        }
    }
    appIconLoaded() {
        this._logoWidth = this.el.nativeElement.querySelector('.navbar-app').scrollWidth;
        this._logoReady.next(true);
        this._logoReady.complete();
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this._navLinksReady.next(true);
            this._navLinksReady.complete();
        }, 100);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this._setRightContainerWidth();
            this._rightLinksReady.next(true);
            this._rightLinksReady.complete();
        }, 100);
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
