/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';
import {
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    IterableDiffers,
    Optional,
    ViewEncapsulation,
    HostBinding,
    Input
} from '@angular/core';
import {Directionality} from '@angular/cdk/bidi';
import {parseBooleanAttribute} from '../util';
import {Platform} from '@angular/cdk/platform';

@Component({
    selector: 'hc-table, table[hc-table]',
    exportAs: 'matTable',
    template: CDK_TABLE_TEMPLATE,
    styleUrls: ['table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HcTable<T> extends CdkTable<T> {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected stickyCssClass = 'hc-table-sticky';

    constructor(
        protected _differs: IterableDiffers,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _elementRef: ElementRef,
        _platform: Platform,
        @Attribute('role') role: string,
        @Optional() protected readonly _dir: Directionality
    ) {
        super(_differs, _changeDetectorRef, _elementRef, role, _dir, document, _platform);
    }

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
