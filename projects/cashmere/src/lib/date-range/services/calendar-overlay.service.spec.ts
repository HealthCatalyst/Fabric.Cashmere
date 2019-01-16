import { TestBed, inject } from '@angular/core/testing';

import { CalendarOverlayService } from './calendar-overlay.service';
import { Overlay } from '@angular/cdk/overlay';

class MockOverlay {}

describe('CalendarOverlayService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: Overlay, useClass: MockOverlay }, CalendarOverlayService]
        });
    });

    it('should be created', inject([CalendarOverlayService], (service: CalendarOverlayService) => {
        expect(service).toBeTruthy();
    }));
});
