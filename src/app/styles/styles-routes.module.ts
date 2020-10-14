import {RouterModule, Routes} from '@angular/router';
import {StylesComponent} from './styles.component';
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
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';
import {TrademarksDemoComponent} from './trademarks/trademarks-demo.component';
import {NgModule} from '@angular/core';
import {BreadcrumbsStyleDemoComponent} from './breadcrumbs/breadcrumbs-style-demo.component';
import {ApplicationLaunchScreenGuideComponent} from './application-launch-screen/application-launch-screen.component';

const routes: Routes = [
    {
        path: 'styles',
        component: StylesComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent,
                data: {title: 'UI Colors', category: 'foundations'}
            },
            {
                path: 'brand-colors',
                component: BrandColorDemoComponent,
                data: {title: 'Brand Colors', category: 'foundations'}
            },
            {
                path: 'typography',
                component: TypographyDemoComponent,
                data: {title: 'Typography', category: 'foundations'}
            },
            {
                path: 'icons',
                component: IconGuideComponent,
                data: {title: 'Icons', category: 'foundations'}
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: {title: 'Code', category: 'foundations'}
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
                path: 'logo',
                component: LogoDemoComponent,
                data: {title: 'Logo', category: 'branding'}
            },
            {
                path: 'products',
                component: ProductsDemoComponent,
                data: {title: 'Product Icons', category: 'branding'}
            },
            {
                path: 'trademarks',
                component: TrademarksDemoComponent,
                data: {title: 'Trademarks', category: 'branding'}
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
export class StylesRoutesModule {}
