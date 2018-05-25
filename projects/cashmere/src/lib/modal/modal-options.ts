export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export class ModalOptions {
    public size: ModalSize = 'md';
    public data?: any;
    public container?: HTMLElement;
    public ignoreOverlayClick?: boolean;
    public ignoreEscapeKey?: boolean;
}
