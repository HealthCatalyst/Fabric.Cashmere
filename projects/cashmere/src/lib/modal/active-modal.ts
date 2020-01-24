export class ActiveModal<T = any, U = any> {
    /** Data that was passed in through ModalOptions */
    public data?: T;
    /** Closes the modal with an optional result.
     * Use this close method when opening a modal using a component. When doing so,
     * ActiveModal must be injected in order to get access to the close method.
     * To dismiss a modal that was created from a TemplateRef, use the dismiss method
     * on HcModal */
    public close(result?: U): void {}
    /** Dismisses the modal with no result.
     * Use this dismiss method when opening a modal using a component. When doing so,
     * ActiveModal must be injected in order to get access to the dismiss method.
     * To dismiss a modal that was created from a TemplateRef, use the dismiss method
     * on HcModal */
    public dismiss(): void {}
}
