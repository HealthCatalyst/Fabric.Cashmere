// tslint:disable:no-inferrable-types
import {ViewContainerRef} from '@angular/core';
import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy} from '@angular/cdk/overlay';

/** Valid ARIA roles for a dialog element. */
export type DialogRole = 'dialog' | 'alertdialog';

/** Possible overrides for a dialog's position. */
export interface DialogPosition {
    /** Override for the dialog's top position. */
    top?: string;

    /** Override for the dialog's bottom position. */
    bottom?: string;

    /** Override for the dialog's left position. */
    left?: string;

    /** Override for the dialog's right position. */
    right?: string;
}

/**
 * Configuration for opening a modal dialog with the HcDialog service.
 */
export class HcDialogConfig<D = any> {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;

    /** The ARIA role of the dialog element. */
    role?: DialogRole = 'dialog';

    /** Custom class for the overlay pane. */
    panelClass?: string | string[] = '';

    /** Whether the dialog has a backdrop. */
    hasBackdrop?: boolean = true;

    /** Custom class for the backdrop, */
    backdropClass?: string = '';

    /** Whether the user can use escape or clicking on the backdrop to close the modal. */
    disableClose?: boolean = false;

    /** Width of the dialog. */
    width?: string = '';

    /** Height of the dialog. */
    height?: string = '';

    /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;

    /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;

    /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
    maxWidth?: number | string = '80vw';

    /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;

    /** Position overrides. */
    position?: DialogPosition;

    /** Data being injected into the child component. */
    data?: D | null = null;

    /** Layout direction for the dialog's content. */
    direction?: Direction;

    /** ID of the element that describes the dialog. */
    ariaDescribedBy?: string | null = null;

    /** Aria label to assign to the dialog element */
    ariaLabel?: string | null = null;

    /** Whether the dialog should focus the first focusable element on open. */
    autoFocus?: boolean = true;

    /**
     * Whether the dialog should restore focus to the
     * previously-focused element, after it's closed.
     */
    restoreFocus?: boolean = true;

    /** Scroll strategy to be used for the dialog. */
    scrollStrategy?: ScrollStrategy;

    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    closeOnNavigation?: boolean = true;

    // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
}
