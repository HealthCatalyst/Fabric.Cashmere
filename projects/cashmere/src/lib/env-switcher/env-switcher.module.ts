import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {EnvSwitcherComponent} from './env-switcher.component';
import {PopModule} from '../pop/popover.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';
import {EnvironmentSwitcherService} from './env-switcher.service';
import {WorkTrackerService} from '../shared/work-tracker.service';
import {PipesModule} from '../pipes/pipes.module';
import {IEnvSwitcherConfig, ENV_SWITCHER_CONFIG, ENV_SWITCHER_SERVICE} from './env-switcher-interfaces';
import {IconModule} from '../icon/icon.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {ButtonModule} from '../button/button.module';

@NgModule({
    imports: [CommonModule, PopModule, HttpClientModule, PipesModule, IconModule, ProgressIndicatorsModule, CheckboxModule, ButtonModule],
    declarations: [EnvSwitcherComponent],
    exports: [EnvSwitcherComponent],
    entryComponents: [EnvSwitcherComponent],
    providers: [
        {
            provide: ENV_SWITCHER_SERVICE,
            useClass: EnvironmentSwitcherService
        },
        WorkTrackerService
    ]
})
export class EnvSwitcherModule {
    static forRoot(config: IEnvSwitcherConfig): ModuleWithProviders<EnvSwitcherModule> {
        return {
            ngModule: EnvSwitcherModule,
            providers: [
                {
                    provide: ENV_SWITCHER_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
