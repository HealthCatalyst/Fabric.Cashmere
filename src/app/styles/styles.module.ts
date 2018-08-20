import {NgModule} from '@angular/core';
import {ColorDemoComponent} from './color/color-demo.component';
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
import {StylesRoutesModule} from './styles-routes.module';
import {BreadcrumbsStyleDemoComponent} from './breadcrumbs/breadcrumbs-style-demo.component';
import {StylesComponent} from './styles.component';

@NgModule({
    imports: [SharedModule, StylesRoutesModule],
    declarations: [
        StylesComponent,
        ColorDemoComponent,
        TableDemoComponent,
        SwatchDemoComponent,
        TypographyDemoComponent,
        CodeDemoComponent,
        ChartDemoComponent,
        BarchartComponent,
        LinechartComponent,
        ErrorPagesComponent,
        LoginPageComponent,
        AboutModalComponent,
        BreadcrumbsStyleDemoComponent
    ]
})
export class StylesModule {}
