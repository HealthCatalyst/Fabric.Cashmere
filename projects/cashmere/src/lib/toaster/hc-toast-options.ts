export interface HcToastOptions {
    /** A string of header text to be included in the toast message.*/
    header?: string;
    /** The body text to be displayed in the toast message.*/
    body?: string;
    /** Sets the background color of the toast. Defaults to success.
     * Options are: `success`, `info`, `warning`, `alert`, `custom`*/
    type?: string;
    /** Position and sizing of the toaster message. Defaults to bottom-right.
     * Options are: `top-right`, `top-center`, `top-left`, `top-full-width`,
     * `bottom-right`, `bottom-center`, `bottom-left`, `bottom-full-width`.*/
    position?: string;
    /** Timeout value in milliseconds sets the amount of time the toast is displayed.
     *  Defaults to 5000. A value of 0 means the toast will not auto-dismiss.*/
    timeout?: number;
    /** When set to true, the user may click the Toast to dismiss it and a close icon is added
     * to the right side for standard types. Defaults to false.*/
    clickDismiss?: boolean;
    /** Function to be called when the toast is closed either via timeout or click*/
    toastClosed?: () => unknown;
    /** Function to be called when a click is detected anywhere in the body of the toast*/
    toastClicked?: () => unknown;
    /** Width of the toast in pixels. Minimum is 300px. Or, pass in 0 for an unconstrained width. Defaults to 300px.*/
    width?: number;
    /** When set to true, a progress bar is added to the bottom of the toast. The default is false.
     * There is a corresponding 0-100 `progress` value on the `hc-toast-ref` that may be set to make this a determinate progress bar.
     * If a `progress` value is not set, the progress bar will be indeterminate.*/
    hasProgressBar?: boolean;
}
