/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {InjectionToken} from '@angular/core';

export type D = Date;

// tslint:disable-next-line:interface-over-type-literal
export type HcDateFormats = {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
};

export const HC_DATE_FORMATS = new InjectionToken<HcDateFormats>('hc-date-formats');
