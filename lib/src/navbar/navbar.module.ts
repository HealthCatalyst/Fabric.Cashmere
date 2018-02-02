import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarLinkComponent } from './navbar-link/navbar-link.component';
import { NavbarIconComponent } from './navbar-icon/navbar-icon.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent],
    exports: [NavbarComponent, NavbarLinkComponent, NavbarIconComponent]
})
export class NavbarModule {
}
