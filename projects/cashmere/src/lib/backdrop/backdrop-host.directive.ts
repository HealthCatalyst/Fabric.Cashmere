/* eslint-disable @angular-eslint/directive-selector */
import { ComponentRef, Directive, EventEmitter, Input, OnDestroy, Output, ViewContainerRef } from "@angular/core";
import { BackdropComponent } from "./backdrop.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
    selector: '[backdropHost]',
    standalone: false
})
export class BackdropHostDirective implements OnDestroy {
    private _ignoreEscapeKey = false;
    private _currentBackdrop: ComponentRef<BackdropComponent> | null = null;

    @Input()
    get ignoreEscapeKey(): boolean {
        return this._ignoreEscapeKey;
    }
    set ignoreEscapeKey(ignoreEscapeKey: boolean) {
        this._ignoreEscapeKey = ignoreEscapeKey;
        if (this._currentBackdrop) {
            this._currentBackdrop.instance._ignoreEscapeKey = ignoreEscapeKey;
        }
    }

    @Output() onClose = new EventEmitter<void>();

    private _destroyed = new Subject<void>();

    constructor(public viewContainerRef: ViewContainerRef) {}

    showBackdrop(): ComponentRef<BackdropComponent> {
        this.hideBackdrop();

        const backdropRef = this.viewContainerRef.createComponent(BackdropComponent);
        backdropRef.instance._ignoreEscapeKey = this._ignoreEscapeKey;
        backdropRef.instance.onClose
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this.onClose.emit());

        this._currentBackdrop = backdropRef;
        return backdropRef;
    }

    hideBackdrop(): void {
        if (!this._currentBackdrop) {
            return;
        }

        const overlayNativeElement = this._currentBackdrop.location.nativeElement;
        overlayNativeElement.parentNode?.removeChild(overlayNativeElement);
        this._currentBackdrop.destroy();
        this._currentBackdrop = null;
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
