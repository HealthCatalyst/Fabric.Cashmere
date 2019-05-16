import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NavbarLinkComponent} from './navbar-link/navbar-link.component';
import {NavbarMobileMenuComponent} from './navbar-mobile-menu/navbar-mobile-menu.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';
import {PopModule} from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopModule],
    declarations: [NavbarComponent, NavbarLinkComponent, NavbarMobileMenuComponent],
    exports: [NavbarComponent, NavbarLinkComponent, NavbarMobileMenuComponent]
})
export class NavbarModule {}
