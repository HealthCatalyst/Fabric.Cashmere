import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewEncapsulation, ContentChildren, QueryList } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { MenuDirective } from '../../pop/directives/menu.directive';
import { MenuItemDirective } from '../../pop/directives/menu-item.directive';
/** Primary navigation links */
@Component({
    selector: 'hc-navbar-dropdown',
    templateUrl: './navbar-dropdown.component.html',
    styleUrls: ['./navbar-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarDropdownComponent {
    constructor(private el: ElementRef, private ref: ChangeDetectorRef) { }
    // TODO:
    // do we need the active?
    // do we need our own styling?

    /** (optional) forces active state *Default is `null`.* */
    @Input()
    active?: boolean = false;

    /** The text to display. This can also optionally be the contents within the element */
    @Input()
    dropdownTitle: string;

    @Input()
    // /** Sets the RouterLinkActive options to match the url exactly to set active state. *Default is false.*
    //  * See https://angular.io/api/router/RouterLinkActive#description
    //  */
    // @Input()
    // exact: boolean = false;
    _hidden: boolean = false;

    @ContentChildren(MenuItemDirective, { descendants: true }) _menuItems: QueryList<MenuItemDirective>;
    _navLinks: QueryList<MenuDirective>;

    /** Disable visibility of component from view */
    hide() {
        this._hidden = true;
        this.ref.detectChanges();
    }

    /** Enable visibility of component from view */
    show() {
        this._hidden = false;
        this.ref.detectChanges();
    }

    _getWidth() {
        return this.el.nativeElement.scrollWidth;
    }
}
