export type HcPopoverScrollStrategy = 'noop' | 'block' | 'reposition' | 'close';
export const VALID_SCROLL: HcPopoverScrollStrategy[] = ['noop', 'block', 'reposition', 'close'];

export type HcPopoverTrigger = 'click' | 'mousedown' | 'rightclick' | 'hover' | 'none';
export const VALID_TRIGGER: HcPopoverTrigger[] = ['click', 'mousedown', 'rightclick', 'hover', 'none'];

export type HcPopoverHorizontalAlign = 'before' | 'start' | 'center' | 'end' | 'after' | 'mouse';
export const VALID_HORIZ_ALIGN: HcPopoverHorizontalAlign[] = ['before', 'start', 'center', 'end', 'after', 'mouse'];

export type HcPopoverVerticalAlign = 'above' | 'start' | 'center' | 'end' | 'below' | 'mouse';
export const VALID_VERT_ALIGN: HcPopoverVerticalAlign[] = ['above', 'start', 'center', 'end', 'below', 'mouse'];

export interface HcPopoverOpenOptions {
    /**
     * Whether the popover should return focus to the previously focused element after
     * closing. Defaults to true.
     */
    restoreFocus?: boolean;

    /** Whether the first focusable element should be focused on open. Defaults to true. */
    autoFocus?: boolean;
}
