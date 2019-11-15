import {Injectable} from '@angular/core';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApplicationInsightsService {
    private appInsights;

    constructor() {
        // Fail gracefully if an application insights key is not provided
        if ( 'instrumentationKey' in environment ) {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: environment['instrumentationKey']
                }
            });

            this.appInsights.loadAppInsights();
        }
    }

    logPageView(name?: string, uri?: string) {
        if ( 'instrumentationKey' in environment ) {
            this.appInsights.trackPageView({name, uri});
        }
    }

    logEvent(trigger: string, target: string) {
        if ( 'instrumentationKey' in environment ) {
            this.appInsights.trackEvent({name: "Example Click", properties: {"example": trigger, "target": target}});
        }
    }
}
