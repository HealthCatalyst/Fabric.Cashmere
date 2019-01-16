import { TestBed, inject } from '@angular/core/testing';

import { ConfigStoreService } from './config-store.service';

describe('ConfigStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConfigStoreService]
        });
    });

    it('should be created', inject([ConfigStoreService], (service: ConfigStoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should setup default options', inject([ConfigStoreService], (service: ConfigStoreService) => {
        service.DateRangeOptions = {
            presets: [],
            format: 'mediumDate',
            range: { fromDate: undefined, toDate: undefined }
        };
        expect(Object.keys(service.DateRangeOptions)).toContain('excludeWeekends');
    }));
});
