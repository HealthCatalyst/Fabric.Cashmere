import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopModule} from '../pop/popover.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';
import {AppSwitcherService} from './app-switcher.service';
import {WorkTrackerService} from '../shared/work-tracker.service';
import {PipesModule} from '../pipes/pipes.module';
import {IAppSwitcherConfig, APP_SWITCHER_CONFIG, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';
import {AppSwitcherLinksComponent} from './app-switcher-application-link/app-switcher-links.component';
import {IconModule} from '../icon/icon.module';

@NgModule({ declarations: [AppSwitcherComponent, AppSwitcherLinksComponent],
    exports: [AppSwitcherComponent, AppSwitcherLinksComponent], imports: [CommonModule, PopModule, PipesModule, IconModule, ProgressIndicatorsModule], providers: [
        {
            provide: APP_SWITCHER_SERVICE,
            useClass: AppSwitcherService
        },
        WorkTrackerService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppSwitcherModule {
    static forRoot(config: IAppSwitcherConfig): ModuleWithProviders<AppSwitcherModule> {
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
