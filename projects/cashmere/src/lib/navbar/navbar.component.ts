import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    QueryList,
    ViewChild
} from '@angular/core';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {PopoverContentComponent} from '../popover/popoverContent.component';

@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
    @Input() user: string = '';
    @Input() appIcon: string = '';
    @Input() brandIcon: string = '';
    @Input() homeUri: string = '';
    @Input() fixedTop: boolean = false;

    @ContentChildren(NavbarMobileMenuComponent) mobileMenu: QueryList<NavbarMobileMenuComponent>;
    @ContentChildren(NavbarLinkComponent) navLinks: QueryList<NavbarLinkComponent>;
    @ViewChild(PopoverContentComponent) popper: PopoverContentComponent;

    menuOpen: boolean = false;
    linkWidths: Array<number> = [];
    linksMax: number = 0;
    collapse: boolean = false;
    logoCondense: boolean = false;
    logoWidth: number = 0;
    moreList: Array<Object> = [];

    @HostListener('window:resize')
    navResize() {
        this.popper.hide();
        this.moreList = [];

        // If links is zero the page is smaller than the first responsive breakpoint
        if (this.el.nativeElement.querySelector('.links').clientWidth > 0) {
            let navbarWidth: number = this.el.nativeElement.querySelector('.navbar').scrollWidth;
            let icons: number = this.el.nativeElement.querySelector('.icon').scrollWidth;
            let more: number = 116;
            let switcher: number = 55;
            let links: number = this.linksMax;
            if (this.logoWidth === 0) {
                this.logoWidth = this.el.nativeElement.querySelector('.navbar-app').scrollWidth;
            }

            if (navbarWidth <= switcher + this.logoWidth + links + icons) {
                this.logoCondense = true;
                let tempArray = this.navLinks.toArray();
                tempArray.reverse();

                if (navbarWidth <= switcher + (this.logoWidth - 50) + links + icons) {
                    this.collapse = true;
                    tempArray[0].hide();
                    links -= this.linkWidths[0];
                    this.moreList.push({name: tempArray[0].linkText, uri: tempArray[0].uri});

                    for (let i = 1; i < tempArray.length; i++) {
                        if (navbarWidth <= switcher + (this.logoWidth - 50) + links + more + icons) {
                            tempArray[i].hide();
                            links -= this.linkWidths[i];
                            this.moreList.push({name: tempArray[i].linkText, uri: tempArray[i].uri});
                        } else {
                            tempArray[i].show();
                        }
                    }

                    this.moreList.reverse();
                } else {
                    this.collapse = false;
                    this.navLinks.forEach(t => t.show());
                }
            } else {
                this.collapse = false;
                this.logoCondense = false;
                this.navLinks.forEach(t => t.show());
            }
            this.ref.detectChanges();
        }
    }

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {}

    ngAfterViewInit() {
        let scope = this;
        setTimeout(function() {
            scope.navLinks.forEach(t => {
                scope.linksMax += t.getWidth();
                scope.linkWidths.push(t.getWidth());
            });
            scope.linkWidths.reverse();

            scope.navResize();
        }, 100);
    }

    toggleMobileMenu() {
        if (this.mobileMenu.first) {
            if (this.menuOpen) {
                this.mobileMenu.first.hide();
                this.menuOpen = false;
            } else {
                this.mobileMenu.first.show();
                this.menuOpen = true;
            }
        }
    }

    menuClick(event: any) {
        let clickTarget: string = event.target.classList[0];

        // Verify that the click in the mobile menu came from a navigation item
        if (clickTarget.indexOf('menu-dropdown') === -1) {
            this.toggleMobileMenu();
        }
    }

    get mobileMenuIcon(): string {
        return this.menuOpen ? 'fa-times' : 'fa-bars';
    }

    moreClick() {
        this.popper.hide();
    }
}
