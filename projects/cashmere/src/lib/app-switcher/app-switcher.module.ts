import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppSwitcherComponent} from './app-switcher.component';
import {PopModule} from '../pop/popover.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';
import {AppSwitcherService} from './app-switcher.service';
import { WorkTrackerService } from '../picklist/services/work-tracker.service';
import {PipesModule} from '../pipes/pipes.module';
import {IAppSwitcherConfig, APP_SWITCHER_CONFIG, APP_SWITCHER_SERVICE} from './app-switcher-interfaces';
import {AppSwitcherLinksComponent} from './app-switcher-application-link/app-switcher-links.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PopModule, HttpClientModule, PipesModule, IconModule, ProgressIndicatorsModule],
    declarations: [AppSwitcherComponent, AppSwitcherLinksComponent],
    exports: [AppSwitcherComponent, AppSwitcherLinksComponent],
    entryComponents: [AppSwitcherComponent],
    providers: [
        {
            provide: APP_SWITCHER_SERVICE,
            useClass: AppSwitcherService
        },
        WorkTrackerService
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
