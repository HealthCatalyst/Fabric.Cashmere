/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {HcTable} from './table.component';
import {HcCell, HcCellDef, HcColumnDef, HcFooterCell, HcFooterCellDef, HcHeaderCell, HcHeaderCellDef} from './cell';
import {HcFooterRow, HcFooterRowDef, HcHeaderRow, HcHeaderRowDef, HcRow, HcRowDef} from './row';
import {HcCellResizer} from './cell-resizer.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CommonModule} from '@angular/common';

const EXPORTED_DECLARATIONS = [
    // HcTable
    HcTable,

    // Template defs
    HcHeaderCellDef,
    HcHeaderRowDef,
    HcColumnDef,
    HcCellDef,
    HcRowDef,
    HcFooterCellDef,
    HcFooterRowDef,

    // Cell directives
    HcHeaderCell,
    HcCell,
    HcFooterCell,

    // Row directions
    HcHeaderRow,
    HcRow,
    HcFooterRow,

    // Cell resizer
    HcCellResizer
];

@NgModule({
    imports: [CdkTableModule, CommonModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class TableModule {}
