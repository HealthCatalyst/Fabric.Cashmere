export class ActiveModal<T = unknown, U = unknown> {
    /** Data that was passed in through ModalOptions */
    public data?: T;
    /** Closes the modal with an optional result.
     * Use this close method when opening a modal using a component. When doing so,
     * ActiveModal must be injected in order to get access to the close method.
     * To dismiss a modal that was created from a TemplateRef, use the dismiss method
     * on HcModal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public close(_result?: U): void {
        // do nothing.
    }
    /** Dismisses the modal with no result.
     * Use this dismiss method when opening a modal using a component. When doing so,
     * ActiveModal must be injected in order to get access to the dismiss method.
     * To dismiss a modal that was created from a TemplateRef, use the dismiss method
     * on HcModal */
    public dismiss(): void {
        // do nothing.
    }
}
