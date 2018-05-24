import {ModalOverlayComponent} from './modal-overlay.component';
import {ComponentRef} from '@angular/core';
import {ModalWindowComponent} from './modal-window.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class HcModal<T> {
    public componentRef: ComponentRef<T> | null;
    public overlay: ComponentRef<ModalOverlayComponent> | null;
    public window: ComponentRef<ModalWindowComponent> | null;
    public result: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public removeOpenClass: (() => void) | null;
    public data?: any;

    public close(result?: any): void {
        this.removeModalElements();
        this.result.next(result);
    }

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

        if (this.removeOpenClass) {
            this.removeOpenClass();
        }

        this.window = null;
        this.overlay = null;
        this.componentRef = null;
        this.removeOpenClass = null;
    }
}
