export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export class ModalOptions {
    /** size of the modal window. Defaults to medium */
    public size: ModalSize = 'md';
    /** Optional. Specify data that will be available on the active modal context */
    public data?: any;
    /** Optional. Specify a different HTML element to append the modal overlay and modal window.
     * If not specified the modal elements will be added to the body */
    public container?: HTMLElement;
    /** Defaults to false. Set to true to disable the closure of a modal by clicking on the overlay. */
    public ignoreOverlayClick?: boolean;
    /** Defaults to false. Set to true to disable the closure of a modal by pressing the escape key. */
    public ignoreEscapeKey?: boolean;
}
