import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSwitcherComponent } from './app-switcher.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AppSwitcherComponent],
  exports: [AppSwitcherComponent]
})
export class AppSwitcherModule { }
