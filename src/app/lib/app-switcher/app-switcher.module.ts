import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSwitcherComponent } from './app-switcher.component';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { AppSwitcherService } from 'app/lib/app-switcher/app-switcher.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'app/lib/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    HttpClientModule,
    PipesModule
  ],
  declarations: [AppSwitcherComponent],
  exports: [AppSwitcherComponent],
  providers: [AppSwitcherService]
})
export class AppSwitcherModule { }
