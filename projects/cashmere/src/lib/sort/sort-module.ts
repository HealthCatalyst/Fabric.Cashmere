/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {HcSortHeader} from './sort-header';
import {HcSort} from './sort';
import {HC_SORT_HEADER_INTL_PROVIDER} from './sort-header-intl';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [HcSort, HcSortHeader],
    declarations: [HcSort, HcSortHeader],
    providers: [HC_SORT_HEADER_INTL_PROVIDER]
})
export class SortModule {}
