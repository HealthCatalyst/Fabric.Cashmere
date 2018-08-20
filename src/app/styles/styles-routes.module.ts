import {RouterModule, Routes} from '@angular/router';
import {StylesComponent} from './styles.component';
import {ColorDemoComponent} from './color/color-demo.component';
import {TableDemoComponent} from './table/table-demo.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {ChartDemoComponent} from './chart/chart-demo.component';
import {ErrorPagesComponent} from './error/error-pages.component';
import {LoginPageComponent} from './login/login-page.component';
import {AboutModalComponent} from './about/about-modal.component';
import {NgModule} from '@angular/core';
import {BreadcrumbsStyleDemoComponent} from './breadcrumbs/breadcrumbs-style-demo.component';

const routes: Routes = [
    {
        path: 'styles',
        component: StylesComponent,
        children: [
            {
                path: 'about',
                component: AboutModalComponent,
                data: {title: 'About Modal'}
            },
            {
                path: 'breadcrumbs',
                component: BreadcrumbsStyleDemoComponent,
                data: {title: 'Breadcrumbs'}
            },
            {
                path: 'color',
                component: ColorDemoComponent,
                data: {title: 'Colors'}
            },
            {
                path: 'table',
                component: TableDemoComponent,
                data: {title: 'Tables'}
            },
            {
                path: 'chart',
                component: ChartDemoComponent,
                data: {title: 'Charts'}
            },
            {
                path: 'typography',
                component: TypographyDemoComponent,
                data: {title: 'Typography'}
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: {title: 'Code'}
            },
            {
                path: 'error',
                component: ErrorPagesComponent,
                data: {title: 'Error Pages'}
            },
            {
                path: 'login',
                component: LoginPageComponent,
                data: {title: 'Login Page'}
            },
            {
                path: '**',
                redirectTo: 'about'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StylesRoutesModule {}
