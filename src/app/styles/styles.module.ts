import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {StylesRoutesModule} from './styles-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {StylesComponent} from './styles.component';
import {AboutModalComponent} from './about/about-modal.component';
import {TableDemoComponent} from './table/table-demo.component';
import {IESupportComponent} from './ie-support/ie-support.component';
import {ChartDemoComponent} from '../styles/chart/chart-demo.component';
import { InfoIconsDemoComponent } from './info-icons/info-icons-demo.component';

@NgModule({
    imports: [SharedModule, StylesRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        StylesComponent,
        AboutModalComponent,
        TableDemoComponent,
        InfoIconsDemoComponent,
        IESupportComponent,
        ChartDemoComponent
    ]
})
export class StylesModule {}
