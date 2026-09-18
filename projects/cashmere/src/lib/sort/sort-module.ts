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
import {PopModule} from '../pop/popover.module';
import {IconModule} from '../icon/icon.module';
import {HcSortMenuComponent} from './sort-menu.component';

@NgModule({
    imports: [CommonModule, PopModule, IconModule],
    exports: [HcSort, HcSortHeader, HcSortMenuComponent],
    declarations: [HcSort, HcSortHeader, HcSortMenuComponent],
    providers: [HC_SORT_HEADER_INTL_PROVIDER]
})
export class SortModule {}
