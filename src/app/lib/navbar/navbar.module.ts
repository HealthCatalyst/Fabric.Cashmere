import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppSwitcherComponent } from './app-switcher/app-switcher.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent, AppSwitcherComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
