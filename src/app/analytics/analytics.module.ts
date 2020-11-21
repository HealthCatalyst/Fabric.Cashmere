import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AnalyticsRoutesModule} from './analytics-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {AnalyticsComponent} from './analytics.component';
import {ChartDemoComponent} from './chart/chart-demo.component';
import {BarchartComponent} from './chart/barchart/barchart.component';
import {LinechartComponent} from './chart/linechart/linechart.component';

@NgModule({
    imports: [SharedModule, AnalyticsRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        AnalyticsComponent,
        ChartDemoComponent,
        BarchartComponent,
        LinechartComponent
    ]
})
export class AnalyticsModule {}
