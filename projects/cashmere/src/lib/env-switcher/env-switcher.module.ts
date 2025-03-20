import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {EnvSwitcherComponent} from './env-switcher.component';
import {PopModule} from '../pop/popover.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';
import {PipesModule} from '../pipes/pipes.module';
import {IconModule} from '../icon/icon.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {ButtonModule} from '../button/button.module';

@NgModule({ declarations: [EnvSwitcherComponent],
    exports: [EnvSwitcherComponent], imports: [CommonModule, PopModule, PipesModule, IconModule, ProgressIndicatorsModule, CheckboxModule, ButtonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class EnvSwitcherModule {}
