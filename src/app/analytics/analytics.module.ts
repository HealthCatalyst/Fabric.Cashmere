import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AnalyticsRoutesModule} from './analytics-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {AnalyticsComponent} from './analytics.component';

@NgModule({
    imports: [SharedModule, AnalyticsRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        AnalyticsComponent
    ]
})
export class AnalyticsModule {}
