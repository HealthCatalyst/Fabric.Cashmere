import {NgModule} from '@angular/core';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideComponent} from './icons/icon-guide.component';
import {TableDemoComponent} from './table/table-demo.component';
import {SwatchDemoComponent} from './color/swatch-demo.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {SharedModule} from '../shared/shared.module';
import {ChartDemoComponent} from './chart/chart-demo.component';
import {BarchartComponent} from './chart/barchart/barchart.component';
import {LinechartComponent} from './chart/linechart/linechart.component';
import {ErrorPagesComponent} from './error/error-pages.component';
import {AboutModalComponent} from './about/about-modal.component';
import {LoginPageComponent} from './login/login-page.component';
import {FoundationsRoutesModule} from './foundations-routes.module';
import {BreadcrumbsStyleDemoComponent} from './breadcrumbs/breadcrumbs-style-demo.component';
import {FoundationsComponent} from './foundations.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {ApplicationLaunchScreenGuideComponent} from './application-launch-screen/application-launch-screen.component';

@NgModule({
    imports: [SharedModule, FoundationsRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        FoundationsComponent,
        ColorDemoComponent,
        IconGuideComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        TypographyDemoComponent,
        CodeDemoComponent,
        ChartDemoComponent,
        BarchartComponent,
        LinechartComponent,
        ErrorPagesComponent,
        LoginPageComponent,
        ApplicationLaunchScreenGuideComponent,
        AboutModalComponent,
        BreadcrumbsStyleDemoComponent,
        BrandColorDemoComponent
    ]
})
export class FoundationsModule {}
