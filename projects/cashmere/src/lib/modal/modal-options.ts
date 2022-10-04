export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl';
export interface ModalOptions {
    /** Optional size of the modal window. Defaults to auto sizing based on content.
     * Options are: `auto`, `sm`, `md`, `lg`, and `xl`.*/
    size?: ModalSize;
    /** Optional. Set to true to reduce padding and title size of modal sections. */
    tight?: boolean;
    /** Optional. Specify data that will be available on the active modal context. */
    data?: unknown;
    /** Optional. Specify a different HTML element to append the modal overlay and modal window.
     * If not specified the modal elements will be added to the body. */
    container?: HTMLElement;
    /** Defaults to false. Set to true to disable the closure of a modal by clicking on the overlay. */
    ignoreOverlayClick?: boolean;
    /** Defaults to false. Set to true to disable the closure of a modal by pressing the escape key. */
    ignoreEscapeKey?: boolean;
    /** Defaults to false. When set to true, a drag handle is added to the top-right corner which can be used to reposition the modal. */
    isDraggable?: boolean;
    /** Defaults to false. When set to true, a resize handle is added to the bottom-right corner which can be used to adjust the dimensions
     * of the modal. Browser support - https://caniuse.com/mdn-css_selectors_-webkit-resizer */
    isResizable?: boolean;
    /** Defaults to false. When set to true, the modal will no longer display in full-screen for mobile devices. */
    disableFullScreen?: boolean;
    /** Whether the modal should return focus to the previously focused element after closing. *Defaults to `true`.* */
    restoreFocus?: boolean;
    /** Whether the first focusable element should be focused on open. *Defaults to `false`.* */
    autoFocus?: boolean;
}
