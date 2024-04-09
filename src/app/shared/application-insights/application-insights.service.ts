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
        if ('instrumentationKey' in environment) {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: environment['instrumentationKey']
                }
            });

            this.appInsights.loadAppInsights();
        }
    }

    logPageView(name?: string, uri?: string): void {
        if ('instrumentationKey' in environment) {
            this.appInsights.trackPageView({name, uri});
        }
    }

    logSiteSearch( query: string ): void {
        if ('instrumentationKey' in environment) {
            this.appInsights.trackEvent({name: 'Site Search', properties: {query: query}});
        }
    }

    logTermSearch( query: string ): void {
        if ('instrumentationKey' in environment) {
            this.appInsights.trackEvent({name: 'Term Search', properties: {query: query}});
        }
    }

    logTemplateDownload( template: string ): void {
        if ('instrumentationKey' in environment) {
            this.appInsights.trackEvent({name: 'Template Download', properties: {template: template}});
        }
    }

    logEvent(trigger: string, target: string): void {
        if ('instrumentationKey' in environment) {
            this.appInsights.trackEvent({name: 'Example Click', properties: {example: trigger, target: target}});
        }
    }
}
