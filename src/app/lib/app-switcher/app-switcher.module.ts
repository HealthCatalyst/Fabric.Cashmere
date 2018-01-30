import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSwitcherComponent } from './app-switcher.component';
import { PopoverModule } from 'app/lib/popover/popover.module';
import { AppSwitcherService, MockAppSwitcherService } from 'app/lib/app-switcher/app-switcher.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'app/lib/pipes/pipes.module';
import { IAppSwitcherConfig } from 'app/lib/app-switcher/app-switcher-interfaces';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    HttpClientModule,
    PipesModule
  ],
  declarations: [AppSwitcherComponent],
  exports: [AppSwitcherComponent],
  providers: [AppSwitcherService,
    {
      provide: 'IAppSwitcherService',
      useClass: AppSwitcherService
    }]
})
export class AppSwitcherModule {
  static forRoot(config: IAppSwitcherConfig): ModuleWithProviders {
    return {
      ngModule: AppSwitcherModule,
      providers: [
        {
          provide: 'IAppSwitcherConfig',
          useValue: config
        }]
    };
  }
}
