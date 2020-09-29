import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NavbarDropdownComponent} from './navbar-dropdown/navbar-dropdown.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {NavbarBrandComponent} from './navbar-brand/navbar-brand.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';
import {PopModule} from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopModule],
    declarations: [NavbarComponent, NavbarDropdownComponent, NavbarLinkComponent, NavbarMobileMenuComponent, NavbarBrandComponent],
    exports: [NavbarComponent, NavbarDropdownComponent, NavbarLinkComponent, NavbarMobileMenuComponent, NavbarBrandComponent]
})
export class NavbarModule {}
