/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {HcDateFormats} from './date-formats';

export const HC_NATIVE_DATE_FORMATS: HcDateFormats = {
    parse: {
        dateInput: null
    },
    display: {
        dateInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
        timeInput: {hour: 'numeric', minute: '2-digit', hour12: true},
        dateTimeInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true},
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
};
