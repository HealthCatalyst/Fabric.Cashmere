/* eslint-disable @angular-eslint/directive-selector */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {CdkCell, CdkCellDef, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkHeaderCell, CdkHeaderCellDef} from '@angular/cdk/table';

/**
 * Cell definition for the hc-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
    selector: '[hcCellDef]',
    providers: [{provide: CdkCellDef, useExisting: HcCellDef}]
})
export class HcCellDef extends CdkCellDef {}

/**
 * Header cell definition for the hc-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
    selector: '[hcHeaderCellDef]',
    providers: [{provide: CdkHeaderCellDef, useExisting: HcHeaderCellDef}]
})
export class HcHeaderCellDef extends CdkHeaderCellDef {}

/**
 * Footer cell definition for the hc-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
    selector: '[hcFooterCellDef]',
    providers: [{provide: CdkFooterCellDef, useExisting: HcFooterCellDef}]
})
export class HcFooterCellDef extends CdkFooterCellDef {}

/**
 * Column definition for the hc-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
    selector: '[hcColumnDef]',
    providers: [{provide: CdkColumnDef, useExisting: HcColumnDef}]
})
export class HcColumnDef extends CdkColumnDef {
    private _justify = 'left';

    /** Unique name for this column. */
    @Input('hcColumnDef')
    get colName(): string {
        return this.name;
    }
    set colName( value: string ) {
        this.name = value;
    }

    /** Sets the text alignment for this column: `left` (default), `center` or `right` */
    @Input()
    get justify(): string {
        return this._justify;
    }

    set justify(justifyVal: string) {
        if (justifyVal === 'left' || justifyVal === 'center' || justifyVal === 'right') {
            this._justify = justifyVal;
        } else {
            throw Error('Unsupported table column alignment value: ' + justifyVal);
        }
    }

    /** Whether this column should be sticky positioned at the start of the row */
    @Input()
    sticky: boolean;

    /** Whether this column should be sticky positioned on the end of the row */
    @Input()
    get stickyEnd(): boolean {
        return this._stickyEnd;
    }
    set stickyEnd( value: boolean ) {
        this._stickyEnd = value;
    }
}

/** Header cell template container that adds the right classes and role. */
@Directive({
    selector: 'hc-header-cell, th[hc-header-cell]',
    host: {
        class: 'hc-header-cell',
        role: 'columnheader'
    }
})
export class HcHeaderCell extends CdkHeaderCell {
    constructor(columnDef: HcColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`hc-column-${columnDef.cssClassFriendlyName}`);
        elementRef.nativeElement.classList.add(`hc-table-justify-` + columnDef.justify);
    }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
    selector: 'hc-footer-cell, td[hc-footer-cell]',
    host: {
        class: 'hc-footer-cell',
        role: 'gridcell'
    }
})
export class HcFooterCell extends CdkFooterCell {
    constructor(columnDef: HcColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`hc-column-${columnDef.cssClassFriendlyName}`);
        elementRef.nativeElement.classList.add(`hc-table-justify-` + columnDef.justify);
    }
}

/** Cell template container that adds the right classes and role. */
@Directive({
    selector: 'hc-cell, td[hc-cell]',
    host: {
        class: 'hc-cell',
        role: 'gridcell'
    }
})
export class HcCell extends CdkCell {
    constructor(columnDef: HcColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`hc-column-${columnDef.cssClassFriendlyName}`);
        elementRef.nativeElement.classList.add(`hc-table-justify-` + columnDef.justify);
    }
}

/** Row index cell template container that adds the right classes and role. */
@Directive({
    selector: 'hc-index-cell, td[hc-index-cell], th[hc-index-cell]',
    host: {
        class: 'hc-index-cell',
        role: 'gridcell'
    }
})
export class HcIndexCell extends CdkCell {
    constructor(columnDef: HcColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`hc-column-${columnDef.cssClassFriendlyName}`);
        elementRef.nativeElement.classList.add(`hc-table-justify-` + columnDef.justify);
    }
}
