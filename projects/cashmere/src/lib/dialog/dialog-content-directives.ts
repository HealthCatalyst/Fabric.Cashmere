/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {Directive, Input, OnChanges, OnInit, Optional, SimpleChanges, ElementRef} from '@angular/core';
import {DialogService} from './dialog.service';
import {HcDialogRef} from './dialog-ref';

/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

// tslint:disable:use-host-property-decorator
// tslint:disable:no-input-rename

/**
 * Button that will close the current dialog.
 */
@Directive({
    selector: `button[hc-dialog-close], button[hcDialogClose]`,
    exportAs: 'hcDialogClose',
    host: {
        '(click)': 'dialogRef.close(dialogResult)',
        '[attr.aria-label]': 'ariaLabel',
        type: 'button' // Prevents accidental form submits.
    }
})
export class DialogCloseDirective implements OnInit, OnChanges {
    /** Screenreader label for the button. */
    @Input('aria-label')
    ariaLabel: string = 'Close dialog';

    /** Dialog close input. */
    @Input('hc-dialog-close')
    dialogResult: any;

    @Input('hcDialogClose')
    _hcDialogClose: any;

    constructor(
        @Optional() public dialogRef: HcDialogRef<any>,
        private _elementRef: ElementRef<HTMLElement>,
        private _dialog: DialogService
    ) {}

    ngOnInit() {
        if (!this.dialogRef) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the DialogRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the DialogRef by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const proxiedChange = changes._hcDialogClose || changes._hcDialogCloseResult;

        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
    selector: '[hc-dialog-title], [hcDialogTitle]',
    exportAs: 'hcDialogTitle',
    host: {
        class: 'hc-dialog-title',
        '[id]': 'id'
    }
})
export class DialogTitleDirective implements OnInit {
    @Input()
    id = `hc-dialog-title-${dialogElementUid++}`;

    constructor(
        @Optional() private _dialogRef: HcDialogRef<any>,
        private _elementRef: ElementRef<HTMLElement>,
        private _dialog: DialogService
    ) {}

    ngOnInit() {
        if (!this._dialogRef) {
            this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
        }

        if (this._dialogRef) {
            Promise.resolve().then(() => {
                const container = this._dialogRef._containerInstance;

                if (container && !container._ariaLabelledBy) {
                    container._ariaLabelledBy = this.id;
                }
            });
        }
    }
}

/**
 * Scrollable content container of a dialog.
 */
@Directive({
    selector: `[hc-dialog-content], hc-dialog-content, [hcDialogContent]`,
    host: {class: 'hc-dialog-content'}
})
export class DialogContentDirective {}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
    selector: `[hc-dialog-actions], hc-dialog-actions, [hcDialogActions]`,
    host: {class: 'hc-dialog-actions'}
})
export class DialogActionsDirective {}

/**
 * Finds the closest HcDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: HcDialogRef<any>[]) {
    let parent: HTMLElement | null = element.nativeElement.parentElement;

    while (parent && !parent.classList.contains('hc-dialog-container')) {
        parent = parent.parentElement;
    }

    return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}
