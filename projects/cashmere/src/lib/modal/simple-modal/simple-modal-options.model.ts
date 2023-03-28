import { ModalOptions } from "../modal-options";

/** Used with ModalService's `alert()`, `confirm()`, and `confirmDestructive()` functions, which generate a
 * quick alert or confirmation modal. */
export class SimpleModalOptions {
    /** Message to show in the body of the modal. */
    message?: string;
    /** Message to show in the body of the modal that includes HTML markup.
     * **WARNING:** You are responsible to sanitize any unsafe user input. */
    messageHTML?: string;
    /** Text to show in the header of the modal. */
    headerText?: string;
    /** Main icon to show. Appears to the left of the header text, or in the body of the modal if there is no header.*/
    icon?: string;
    /** Text to show for the modal's cancel button. Leave empty for no cancel button */
    cancelButtonText?: string;
    /** Text to show for the modal's confirm button. */
    confirmButtonText?: string;
    /** Icon to show in the button. */
    confirmButtonIcon?: string;
    /** True if the modal's button should be colored to designate a destructive action. *Defaults to false.* */
    confirmButtonIsDestructive? = false;
    /** Sets style of confirmation button. Overrides confirmButtonIsDestructive.
     * Choose from: `'primary' | 'primary-alt' | 'destructive' |
     * 'neutral' | 'secondary' | 'minimal' | link' | 'link-inline'`. If needed, colors from
     * the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc) */
    confirmButtonStyle?: string;
    /** Sets style of cancel button. Choose from: `'primary' | 'primary-alt' | 'destructive' |
     * 'neutral' | 'secondary' | 'minimal' | link' | 'link-inline'`. If needed, colors from
     * the primary or secondary palette may be used as well (e.g. 'pink', 'red-orange', etc) */
    cancelButtonStyle? = false;
    /** Text for an optional informational tooltip that will be in the footer. */
    footerTooltipText?: string;
}

// Default options for the content of a confirmation modal
export function getDefaultConfirmationOptions(): SimpleModalOptions {
    return {
        message: 'Are you sure?',
        icon: 'hc-ico-question',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Confirm',
        confirmButtonIsDestructive: false,
    };
}

// Default options for the content of a delete confirmation modal
export function getDefaultDestructiveOptions(): SimpleModalOptions {
    return {
        message: 'Are you sure you want to delete this item?',
        headerText: 'Delete item?',
        icon: 'hc-ico-trash',
        confirmButtonText: 'Delete item',
        confirmButtonIsDestructive: true,
    };
}

// Default options for the content of an alert modal
export function getDefaultAlertOptions(): SimpleModalOptions {
    return {
        icon: 'hc-ico-warn',
        cancelButtonText: '',
        confirmButtonText: 'OK',
    };
}

// default options for the modal window itself
export function getDefaultModalOptions(): ModalOptions {
    return {
        ignoreOverlayClick: true,
        size: 'md'
    };
}
