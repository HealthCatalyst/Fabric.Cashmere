import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoundationsComponent} from './foundations.component';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideComponent} from './icons/icon-guide.component';
import {TableDemoComponent} from './table/table-demo.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {ChartDemoComponent} from './chart/chart-demo.component';
import {ErrorPagesComponent} from './error/error-pages.component';
import {LoginPageComponent} from './login/login-page.component';
import {AboutModalComponent} from './about/about-modal.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {BreadcrumbsStyleDemoComponent} from './breadcrumbs/breadcrumbs-style-demo.component';
import {ApplicationLaunchScreenGuideComponent} from './application-launch-screen/application-launch-screen.component';

const routes: Routes = [
    {
        path: 'foundations',
        component: FoundationsComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent,
                data: {title: 'UI Colors', category: 'colors'}
            },
            {
                path: 'brand-colors',
                component: BrandColorDemoComponent,
                data: {title: 'Brand Colors', category: 'colors'}
            },
            {
                path: 'typography',
                component: TypographyDemoComponent,
                data: {title: 'Type', category: 'typography'}
            },
            {
                path: 'icons',
                component: IconGuideComponent,
                data: {title: 'Icons', category: 'typography'}
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: {title: 'Source Code', category: 'typography'}
            },
            {
                path: 'about',
                component: AboutModalComponent,
                data: {title: 'About Modal', category: 'ui'}
            },
            {
                path: 'breadcrumbs',
                component: BreadcrumbsStyleDemoComponent,
                data: {title: 'Breadcrumbs', category: 'ui'}
            },
            {
                path: 'chart',
                component: ChartDemoComponent,
                data: {title: 'Charts', category: 'ui'}
            },
            {
                path: 'error',
                component: ErrorPagesComponent,
                data: {title: 'Error Pages', category: 'ui'}
            },
            {
                path: 'launch-screen',
                component: ApplicationLaunchScreenGuideComponent,
                data: {title: 'Launch Screen', category: 'ui'}
            },
            {
                path: 'login',
                component: LoginPageComponent,
                data: {title: 'Login Page', category: 'ui'}
            },
            {
                path: 'table',
                component: TableDemoComponent,
                data: {title: 'Tables', category: 'ui'}
            },
            {
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FoundationsRoutesModule {}
