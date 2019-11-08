import {Injectable} from '@angular/core';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApplicationInsightsService {
    private appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: environment.instrumentationKey
        }
    });

    constructor() {
        this.appInsights.loadAppInsights();
    }

    setUserId(userId: string) {
        this.appInsights.setAuthenticatedUserContext(userId);
    }

    clearUserId() {
        this.appInsights.clearAuthenticatedUserContext();
    }

    logPageView(name?: string, uri?: string) {
        this.appInsights.trackPageView({name, uri});
    }
}
