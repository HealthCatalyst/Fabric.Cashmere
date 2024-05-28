/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CDK_TABLE, CDK_TABLE_TEMPLATE, CdkTable, _COALESCED_STYLE_SCHEDULER, _CoalescedStyleScheduler} from '@angular/cdk/table';
import {ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding, Input} from '@angular/core';
import {parseBooleanAttribute} from '../util';
import {_DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY} from '@angular/cdk/collections';

@Component({
    selector: 'hc-table, table[hc-table]',
    exportAs: 'matTable',
    template: CDK_TABLE_TEMPLATE,
    styleUrls: ['table.component.scss'],
    providers: [
        {provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy},
        {provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler},
        {provide: CDK_TABLE, useExisting: HcTable}
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HcTable<T> extends CdkTable<T> {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected stickyCssClass = 'hc-table-sticky';

    @HostBinding('class.hc-table')
    _hostHcTableClass = true;
    @HostBinding('class.hc-table-borders')
    _hostHcBordersClass = true;
    @HostBinding('class.hc-table-small')
    _hostHcTableSmall = false;

    /** Sets whether the table should have a 2px border around each cell (defaults to true) */
    @Input()
    get borders(): boolean {
        return this._hostHcBordersClass;
    }

    set borders(hasBorders: boolean) {
        this._hostHcBordersClass = parseBooleanAttribute(hasBorders);
    }

    /** If true, table has less padding and a smaller font size (defaults to false)  */
    @Input()
    get tight(): boolean {
        return this._hostHcTableSmall;
    }
    set tight(value: boolean) {
        this._hostHcTableSmall = parseBooleanAttribute(value);
    }
}
