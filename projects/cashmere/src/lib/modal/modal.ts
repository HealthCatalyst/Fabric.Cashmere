import {ModalOverlayComponent} from './modal-overlay.component';
import {ComponentRef} from '@angular/core';
import {ModalWindowComponent} from './modal-window.component';
import {Subject} from 'rxjs';

export class HcModal<T> {
    /** Allows direct access to the component used to create the modal. Null when TemplateRef is used */
    public componentRef: ComponentRef<T> | null;
    /** Allows direct access to overlay component which holds the component/template */
    public overlay: ComponentRef<ModalOverlayComponent> | null;
    /** Allows direct access to window component which holds the component/template */
    public window: ComponentRef<ModalWindowComponent> | null;
    /** Subscribe to result in order to get access to modal result values passed in ActiveModal.close() */
    public result: Subject<any> = new Subject<any>();
    public _removeOpenClass: (() => void) | null;
    /** Data that was passed in through ModalOptions */
    public data?: any;

    /** Closes the modal with a result.
     * Use this close method when opening a modal using a TemplateRef.
     * To close a modal that was created from a Component, inject ActiveModal and use the close method
     * on ActiveModal */
    public close(result?: any): void {
        this.removeModalElements();
        this.result.next(result);
    }

    /** Dismisses the modal with no result.
     * Use this dismiss method when opening a modal using a TemplateRef.
     * To dismiss a modal that was created from a Component, inject ActiveModal and use the dismiss method
     * on ActiveModal */
    public dismiss(): void {
        this.removeModalElements();
    }

    private removeModalElements() {
        if (this.window) {
            const windowNativeElement = this.window.location.nativeElement;
            windowNativeElement.parentNode.removeChild(windowNativeElement);
            this.window.destroy();
        }

        if (this.overlay) {
            const overlayNativeElement = this.overlay.location.nativeElement;
            overlayNativeElement.parentNode.removeChild(overlayNativeElement);
            this.overlay.destroy();
        }

        if (this.componentRef) {
            const componentNativeElement = this.componentRef.location.nativeElement;
            componentNativeElement.parentNode.removeChild(componentNativeElement);
            this.componentRef.destroy();
        }

        if (this._removeOpenClass) {
            this._removeOpenClass();
        }

        this.window = null;
        this.overlay = null;
        this.componentRef = null;
        this._removeOpenClass = null;
    }
}
