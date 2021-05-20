export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl';
export interface ModalOptions {
    /** Optional size of the modal window. Defaults to auto sizing based on content.
     * Options are: `auto`, `sm`, `md`, `lg`, and `xl`.*/
    size?: ModalSize;
    /** Optional. Specify data that will be available on the active modal context. */
    data?: any;
    /** Optional. Specify a different HTML element to append the modal overlay and modal window.
     * If not specified the modal elements will be added to the body. */
    container?: HTMLElement;
    /** Defaults to false. Set to true to disable the closure of a modal by clicking on the overlay. */
    ignoreOverlayClick?: boolean;
    /** Defaults to false. Set to true to disable the closure of a modal by pressing the escape key. */
    ignoreEscapeKey?: boolean;
    /** Defaults to false. When set to true, a drag handle is added to the top-right corner which can be used to reposition the modal. */
    isDraggable?: boolean;
    /** Defaults to false. When set to true, the modal will no longer display in full-screen for mobile devices. */
    disableFullScreen?: boolean;
}
