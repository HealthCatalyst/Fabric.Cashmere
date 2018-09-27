import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarIconComponent} from './navbar-icon/navbar-icon.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';
import {PopoverModule} from '../popover/popover.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopoverModule],
    declarations: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent, NavbarMobileMenuComponent],
    exports: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent, NavbarMobileMenuComponent]
})
export class NavbarModule {}
