import {TestBed} from '@angular/core/testing';

import {ApplicationInsightsService} from './application-insights.service';

describe('ApplicationInsightsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ApplicationInsightsService = TestBed.inject(ApplicationInsightsService);
        expect(service).toBeTruthy();
    });
});
