import { Component, ViewEncapsulation, ViewChild, forwardRef, ContentChildren, AfterViewInit } from '@angular/core';
import type { QueryList } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { HcPopComponent } from '../../pop/popover.component';
import { MenuItemDirective } from '../../pop/directives/menu-item.directive';

/** A dropdown menu in a `hc-navbar` */
@Component({
    selector: 'hc-navbar-dropdown',
    templateUrl: './navbar-dropdown.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: NavbarLinkComponent, useExisting: forwardRef(() => NavbarDropdownComponent) }],
    standalone: false
})
export class NavbarDropdownComponent extends NavbarLinkComponent implements AfterViewInit {
    @ViewChild('menuPop')
    _menuPop: HcPopComponent;

    /** Reference to hcMenuItems (if the content contains them) */
    @ContentChildren(MenuItemDirective, {descendants: true}) _menuItems: QueryList<MenuItemDirective>;

    ngAfterViewInit(): void {
        // Update the popover's reference to menu items included in this component's content
        this._menuPop._menuItems = this._menuItems;
    }
}
