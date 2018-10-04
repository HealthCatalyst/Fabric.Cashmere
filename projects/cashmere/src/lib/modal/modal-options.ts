export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export interface ModalOptions {
    /** size of the modal window. Defaults to medium */
    size: ModalSize;
    /** Optional. Specify data that will be available on the active modal context */
    data?: any;
    /** Optional. Specify a different HTML element to append the modal overlay and modal window.
     * If not specified the modal elements will be added to the body */
    container?: HTMLElement;
    /** Defaults to false. Set to true to disable the closure of a modal by clicking on the overlay. */
    ignoreOverlayClick?: boolean;
    /** Defaults to false. Set to true to disable the closure of a modal by pressing the escape key. */
    ignoreEscapeKey?: boolean;
}
