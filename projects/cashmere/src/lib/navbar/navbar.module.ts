import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';
import {PopoverModule} from '../popover/popover.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopoverModule],
    declarations: [NavbarComponent, NavbarLinkComponent, NavbarMobileMenuComponent],
    exports: [NavbarComponent, NavbarLinkComponent, NavbarMobileMenuComponent]
})
export class NavbarModule {}
