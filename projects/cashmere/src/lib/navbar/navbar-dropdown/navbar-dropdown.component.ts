import { Component, ViewEncapsulation, ViewChild, forwardRef, Input } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { HcPopComponent } from '../../pop/popover.component';
import { HcPopoverAnchorDirective } from '../../pop/directives/popover-anchor.directive';

/** A dropdown menu in a `hc-navbar` */
@Component({
    selector: 'hc-navbar-dropdown',
    templateUrl: './navbar-dropdown.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: NavbarLinkComponent, useExisting: forwardRef(() => NavbarDropdownComponent)}],
})
export class NavbarDropdownComponent extends NavbarLinkComponent {
    @ViewChild('menuPop', {static: false})
    _menuPop: HcPopComponent;
}
