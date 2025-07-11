/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, Directive, HostBinding, ViewEncapsulation} from '@angular/core';
import {CDK_ROW_TEMPLATE, CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef} from '@angular/cdk/table';

/**
 * Header row definition for the hc-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
    selector: '[hcHeaderRowDef]',
    providers: [{ provide: CdkHeaderRowDef, useExisting: HcHeaderRowDef }],
    inputs: ['columns: hcHeaderRowDef', 'sticky: hcHeaderRowDefSticky'],
    standalone: false
})
export class HcHeaderRowDef extends CdkHeaderRowDef {}

/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
    selector: '[hcFooterRowDef]',
    providers: [{ provide: CdkFooterRowDef, useExisting: HcFooterRowDef }],
    inputs: ['columns: hcFooterRowDef', 'sticky: hcFooterRowDefSticky'],
    standalone: false
})
export class HcFooterRowDef extends CdkFooterRowDef {}

/**
 * Data row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
    selector: '[hcRowDef]',
    providers: [{ provide: CdkRowDef, useExisting: HcRowDef }],
    inputs: ['columns: hcRowDefColumns', 'when: hcRowDefWhen'],
    standalone: false
})
export class HcRowDef<T> extends CdkRowDef<T> {}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'hc-header-row, tr[hc-header-row]',
    template: CDK_ROW_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'hcHeaderRow',
    providers: [{ provide: CdkHeaderRow, useExisting: HcHeaderRow }],
    standalone: false
})
export class HcHeaderRow extends CdkHeaderRow {
    @HostBinding('class.hc-header-row') _hostClass = true;
    @HostBinding('attr.role') _role = 'row';
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'hc-footer-row, tr[hc-footer-row]',
    template: CDK_ROW_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'hcFooterRow',
    providers: [{ provide: CdkFooterRow, useExisting: HcFooterRow }],
    standalone: false
})
export class HcFooterRow extends CdkFooterRow {
    @HostBinding('class.hc-footer-row') _hostClass = true;
    @HostBinding('attr.role') _role = 'row';
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
    selector: 'hc-row, tr[hc-row]',
    template: CDK_ROW_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'hcRow',
    providers: [{ provide: CdkRow, useExisting: HcRow }],
    standalone: false
})
export class HcRow extends CdkRow {
    @HostBinding('class.hc-row') _hostClass = true;
    @HostBinding('attr.role') _role = 'row';
}
