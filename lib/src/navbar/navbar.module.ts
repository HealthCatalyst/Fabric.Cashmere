import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarLinkComponent } from './navbar-link/navbar-link.component';
import { NavbarIconComponent } from './navbar-icon/navbar-icon.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IconModule
    ],
    declarations: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent, NavbarMenuComponent],
    exports: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent, NavbarMenuComponent]
})
export class NavbarModule {
}
