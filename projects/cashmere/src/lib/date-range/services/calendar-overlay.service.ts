import { Injectable, ElementRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PickerOverlayComponent } from '../picker-overlay/picker-overlay.component';

@Injectable()
export class CalendarOverlayService {
    private hostElemRef: ElementRef;

    constructor(private overlay: Overlay, private injector: Injector) {}

    open(hostElemRef: ElementRef): OverlayRef {
        this.hostElemRef = hostElemRef;
        const overlayRef = this.createOverlay();
        const portalInjector = this.createInjector(overlayRef);
        const calendarPortal = new ComponentPortal(PickerOverlayComponent, null, portalInjector);
        overlayRef.attach(calendarPortal);

        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

        return overlayRef;
    }

    private createOverlay(): OverlayRef {
        const overlayConfig = this.getOverlayConfig();
        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
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

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'hc-overlay-transparent-backdrop',
            panelClass: 'hc-date-range-overlay',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }

    private createInjector(overlayRef: OverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(OverlayRef, overlayRef);

        return new PortalInjector(this.injector, injectionTokens);
    }
}
