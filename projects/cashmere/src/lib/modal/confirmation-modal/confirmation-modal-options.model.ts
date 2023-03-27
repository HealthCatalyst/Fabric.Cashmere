/** Used with ConfirmationModalService, which has convenient functions for generating a
 * quick modal requesting a confirm/cancel response. */
export class ConfirmationOptions {
    /** Message to show in the body of the confirmation modal. */
    message?: string;
    /** Message to show in the body of the confirmation modal that includes HTML markup.
     * **WARNING:** You are responsible to sanitize any unsafe user input. */
    messageHTML?: string;
    /** Text to show in the header of the confirmation modal. */
    headerText?: string;
    /** Icon show to the left of the header text in the confirmation modal. */
    icon?: string;
    /** Text to show for the confirmation modal's cancel button. */
    cancelButtonText?: string;
    /** Text to show for the confirmation modal's confirm button. */
    confirmButtonText?: string;
    /** Icon to show in the confirmation button. */
    confirmButtonIcon?: string;
    /** True if the confirmation modal's button should be colored to designate a destructive action. *Defaults to false.* */
    confirmButtonIsDestructive? = false;
    /** Text for an optional informational tooltip that will be in the footer. */
    footerTooltipText?: string;
}
