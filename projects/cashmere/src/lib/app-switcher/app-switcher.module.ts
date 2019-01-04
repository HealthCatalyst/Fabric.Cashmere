import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopoverModule} from '../popover/popover.module';
import {AppSwitcherService} from './app-switcher.service';
import {PipesModule} from '../pipes/pipes.module';
import {IAppSwitcherConfig, APP_SWITCHER_CONFIG, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';
import {AppSwitcherLinksComponent} from './app-switcher-application-link/app-switcher-links.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PopoverModule, HttpClientModule, PipesModule, IconModule],
    declarations: [AppSwitcherComponent, AppSwitcherLinksComponent],
    exports: [AppSwitcherComponent, AppSwitcherLinksComponent],
    providers: [
        {
            provide: APP_SWITCHER_SERVICE,
            useClass: AppSwitcherService
        }
    ]
})
export class AppSwitcherModule {
    static forRoot(config: IAppSwitcherConfig): ModuleWithProviders {
        return {
            ngModule: AppSwitcherModule,
            providers: [
                {
                    provide: APP_SWITCHER_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
