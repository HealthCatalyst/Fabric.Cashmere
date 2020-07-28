import { Component, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

/** Navigation dropdown for small screen sizes */
@Component({
    selector: 'hc-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarMobileMenuComponent implements AfterViewInit {
    @ViewChild('navbarMobile', { static: false }) mobileMenu: ElementRef;
    /** Base value, should be enough to not show */
    public _yPos: number;

    /** Sets the actual position of the mobile menu to the hight of its self */
    ngAfterViewInit() {
        this.hide();
        this.ref.detectChanges();
    }
    constructor(private ref: ChangeDetectorRef) { }

    /** Show the component from view */
    show(): void {
        this._yPos = 0;
    }

    /** Hide the component from view */
    hide(): void {
        this._yPos = -this.mobileMenu.nativeElement.offsetHeight;
    }
}
