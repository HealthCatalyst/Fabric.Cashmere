import {ModalOverlayComponent} from './modal-overlay.component';
import {ComponentRef, EventEmitter} from '@angular/core';
import {ModalWindowComponent} from './modal-window.component';
import {Subject, Observable} from 'rxjs';

export class HcModal<T> {
    /** Allows direct access to the component used to create the modal. Null when TemplateRef is used */
    componentRef: ComponentRef<T> | null;

    /** Allows direct access to overlay component which holds the component/template */
    overlay: ComponentRef<ModalOverlayComponent> | null;

    /** Allows direct access to window component which holds the component/template */
    window: ComponentRef<ModalWindowComponent> | null;

    /** Subscribe to result in order to get access to modal result values passed in ActiveModal.close() */
    get result(): Observable<unknown> {
        return this._result.asObservable();
    }

    private _result: Subject<unknown> = new Subject<unknown>();

    _removeOpenClass: (() => void) | null;

    _modalClose = new EventEmitter();

    /** Data that was passed in through ModalOptions */
    data?: unknown;

    /** Closes the modal with a result.
     * Use this close method when opening a modal using a TemplateRef.
     * To close a modal that was created from a Component, inject ActiveModal and use the close method
     * on ActiveModal */
    close(result?: unknown): void {
        this.removeModalElements();
        this._result.next(result);
    }

    /** Dismisses the modal with no result.
     * Use this dismiss method when opening a modal using a TemplateRef.
     * To dismiss a modal that was created from a Component, inject ActiveModal and use the dismiss method
     * on ActiveModal */
    dismiss(): void {
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

        this._modalClose.emit();

        this.window = null;
        this.overlay = null;
        this.componentRef = null;
        this._removeOpenClass = null;
    }
}
