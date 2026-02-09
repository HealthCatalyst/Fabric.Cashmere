import {Injectable, ElementRef, Injector, EventEmitter, OnDestroy} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {PickerOverlayComponent} from '../picker-overlay/picker-overlay.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class CalendarOverlayService implements OnDestroy {
    private hostElemRef: ElementRef;

    readonly _dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
    private unsubscribe$ = new Subject<void>();

    constructor(private overlay: Overlay, private injector: Injector) {}

    open(hostElemRef: ElementRef, center?: boolean): OverlayRef {
        this.hostElemRef = hostElemRef;
        const overlayRef = this._createOverlay(center);
        const portalInjector = this._createInjector(overlayRef);
        const calendarPortal = new ComponentPortal(PickerOverlayComponent, null, portalInjector);
        const compRef = overlayRef.attach(calendarPortal);

        overlayRef.backdropClick().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this._dismissed.emit( false );
            overlayRef.dispose();
        });

        compRef.instance._dismissed.pipe(takeUntil(this.unsubscribe$)).subscribe( saved => {
            this._dismissed.emit( saved );
        });

        return overlayRef;
    }

    private _createOverlay(center): OverlayRef {
        const overlayConfig = this._getOverlayConfig(center);
        return this.overlay.create(overlayConfig);
    }

    private _getOverlayConfig(center): OverlayConfig {
        let positionStrategy;

        if (center) {
            positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        } else {
            positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.hostElemRef)
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withDefaultOffsetY(12)
            .withLockedPosition()
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ]);
        }

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'hc-overlay-transparent-backdrop',
            panelClass: 'hc-date-range-overlay',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }

    private _createInjector(overlayRef: OverlayRef): Injector {
        return Injector.create({
            providers: [
                { provide: OverlayRef, useValue: overlayRef }
            ],
            parent: this.injector
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
