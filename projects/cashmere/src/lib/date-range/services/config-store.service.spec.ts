import {TestBed, inject, async} from '@angular/core/testing';

import {ConfigStoreService} from './config-store.service';

describe('ConfigStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigStoreService]
        });
    });

    it('should be created', inject([ConfigStoreService], (service: ConfigStoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should setup default options', async(
        inject([ConfigStoreService], (service: ConfigStoreService) => {
            service.updateDateRangeOptions({
                presets: [],
                format: 'mediumDate'
            });
            service.dateRangeOptions$.subscribe(options => {
                expect(Object.keys(options)).toContain('excludeWeekends');
            });
        })
    ));
});
