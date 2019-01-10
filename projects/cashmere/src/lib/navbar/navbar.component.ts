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
    ViewEncapsulation
} from '@angular/core';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {PopoverContentComponent} from '../popover/popoverContent.component';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements AfterViewInit {
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

    @ViewChild(PopoverContentComponent)
    _navbarMore: PopoverContentComponent;

    private _menuOpen: boolean = false;
    private _linkWidths: Array<number> = [];
    private _linksMax: number = 0;
    private _logoWidth: number = 0;
    public _collapse: boolean = false;
    public _logoCondense: boolean = false;
    public _moreList: Array<Object> = [];

    @HostListener('window:resize')
    _navResize() {
        this._navbarMore._hide();
        this._moreList = [];

        // If links is zero the page is smaller than the first responsive breakpoint
        if (this.el.nativeElement.querySelector('.hc-navbar-link-container').clientWidth <= 0) {
            return;
        }

        // Figure out all the relevant element widths
        const navbarWidth: number = this.el.nativeElement.querySelector('.hc-navbar').scrollWidth;
        const icons: number = this.el.nativeElement.querySelector('.hc-navbar-right-container').scrollWidth;
        const more: number = 116;
        const switcher: number = 55;
        let links: number = this._linksMax;
        if (this._logoWidth === 0) {
            this._logoWidth = this.el.nativeElement.querySelector('.navbar-app').scrollWidth;
        }
        const logoWidth = this._logoWidth;
        const condensedLogoWidth = logoWidth - 50;
        const regularWidth = switcher + logoWidth + links + icons;
        const condensedWidth = switcher + condensedLogoWidth + links + icons;

        if (navbarWidth <= regularWidth) {
            this._logoCondense = true;
            let tempArray = this._navLinks.toArray();
            tempArray.reverse();

            if (navbarWidth <= condensedWidth) {
                this._collapse = true;
                tempArray[0].hide();
                links -= this._linkWidths[0];
                this._moreList.push({name: tempArray[0].linkText, uri: tempArray[0].uri});

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

    ngAfterViewInit() {
        let scope = this;
        setTimeout(function() {
            scope._navLinks.forEach(t => {
                scope._linksMax += t._getWidth();
                scope._linkWidths.push(t._getWidth());
            });
            scope._linkWidths.reverse();

            scope._navResize();
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
        this._navbarMore._hide();
    }
}
