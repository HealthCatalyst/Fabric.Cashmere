import { TestBed, inject } from '@angular/core/testing';
import { RangeStoreService, DATE } from './range-store.service';
import { InjectionToken } from '@angular/core';

describe('RangeStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RangeStoreService, { provide: DATE, useValue: new Date() }]
        });
    });

    it('should be created', inject([RangeStoreService], (service: RangeStoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should update the store and emit range update', inject([RangeStoreService], (service: RangeStoreService) => {
        const rangeUpdateSub = service.rangeUpdate$.subscribe(val => {
            expect(val).toBeTruthy();
        });
        service.updateRange();
        rangeUpdateSub.unsubscribe();
    }));
});
