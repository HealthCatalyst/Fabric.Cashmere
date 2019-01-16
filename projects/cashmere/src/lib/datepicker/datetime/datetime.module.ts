/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {PlatformModule} from '@angular/cdk/platform';
import {NgModule} from '@angular/core';
import {DateAdapter} from './date-adapter';
import {HC_DATE_FORMATS} from './date-formats';
import {NativeDateAdapter} from './native-date-adapter';
import {HC_NATIVE_DATE_FORMATS} from './native-date-formats';

@NgModule({
    imports: [PlatformModule],
    providers: [
        {provide: DateAdapter, useClass: NativeDateAdapter},
    ],
})
export class NativeDateModule {}


@NgModule({
    imports: [NativeDateModule],
    providers: [{provide: HC_DATE_FORMATS, useValue: HC_NATIVE_DATE_FORMATS}],
})
export class HcNativeDateModule {}
