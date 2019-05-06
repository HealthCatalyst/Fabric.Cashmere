import {OverlayRef} from '@angular/cdk/overlay';
import {HcToastComponent} from './hc-toast.component';
import {Subject} from 'rxjs';
import {filter, take} from 'rxjs/operators';

export class HcToastRef {
    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    _toastPosition: string;
    /** The HcToast component associated with the toast reference */
    componentInstance: HcToastComponent;

    constructor(public _overlayRef: OverlayRef) {}

    /** Closes the associated toast message with this reference */
    close(): void {
        if (this.componentInstance._animationState !== 'leave') {
            this.componentInstance._animationStateChanged
                .pipe(
                    filter(event => event.phaseName === 'start'),
                    take(1)
                )
                .subscribe(() => {
                    this._beforeClose.next();
                    this._beforeClose.complete();
                });

            this.componentInstance._animationStateChanged
                .pipe(
                    filter(event => event.phaseName === 'done' && event.toState === 'leave'),
                    take(1)
                )
                .subscribe(() => {
                    this._overlayRef.dispose();
                    this._afterClosed.next();
                    this._afterClosed.complete();
                    this.componentInstance._componentInstance.unsubscribe();
                    this.componentInstance = null!;
                });

            this.componentInstance._startExitAnimation();
        }
    }
}
