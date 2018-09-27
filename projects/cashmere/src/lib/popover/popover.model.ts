export type Trigger = 'click' | 'mousedown' | 'hover' | 'none';

export type Placement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'bottom-start'
    | 'left-start'
    | 'right-start'
    | 'top-end'
    | 'bottom-end'
    | 'left-end'
    | 'right-end'
    | 'auto'
    | 'auto-top'
    | 'auto-bottom'
    | 'auto-left'
    | 'auto-right'
    | Function;

export interface PopperContentOptions {
    disableAnimation?: boolean;
    disableDefaultStyling?: boolean;
    placement?: Placement;
    boundariesElement?: string;
    trigger?: Trigger;
    positionFixed?: boolean;
    hideOnClickOutside?: boolean;
    hideOnScroll?: boolean;
    popperModifiers?: {};
}
