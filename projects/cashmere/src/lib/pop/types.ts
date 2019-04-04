export type HcPopoverScrollStrategy = 'noop' | 'block' | 'reposition' | 'close';
export const VALID_SCROLL: HcPopoverScrollStrategy[] = [
  'noop',
  'block',
  'reposition',
  'close'
];

export type HcPopoverHorizontalAlign = 'before' | 'start' | 'center' | 'end' | 'after';
export const VALID_HORIZ_ALIGN: HcPopoverHorizontalAlign[] = [
  'before',
  'start',
  'center',
  'end',
  'after'
];

export type HcPopoverVerticalAlign = 'above'  | 'start' | 'center' | 'end' | 'below';
export const VALID_VERT_ALIGN: HcPopoverVerticalAlign[] = [
  'above',
  'start',
  'center',
  'end',
  'below'
];

export interface HcPopoverOpenOptions {
  /**
   * Whether the popover should return focus to the previously focused element after
   * closing. Defaults to true.
   */
  restoreFocus?: boolean;

  /** Whether the first focusable element should be focused on open. Defaults to true. */
  autoFocus?: boolean;
}
