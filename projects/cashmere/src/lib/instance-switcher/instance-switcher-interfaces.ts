/**
 * Represents an instance to be displayed on the Instance Switcher.
 */
export interface IInstance {
    /** The unique key corresponding to this instance. */
    instanceKey: string;

    /** The text that should be displayed on the instance switcher for this instance. */
    displayText: string;
}

/**
 * Configuration for what text to show on tooltips attached
 * to various controls in the Instance Switcher.
 */
export interface IInstanceSwitcherTooltipText {
    /** The tooltip text for the instances. */
    instanceText?: string;

    /** The tooltip text for the add button. */
    addText?: string;

    /** The tooltip text for the close button. */
    closeText?: string;
}
