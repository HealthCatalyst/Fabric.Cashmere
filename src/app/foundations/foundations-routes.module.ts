import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoundationsComponent} from './foundations.component';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideV1Component} from './icons/icon-guide-v1.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';
import {FontsDemoComponent} from './fonts/fonts-demo.component';
import { AIDemoComponent } from './ai/ai-demo.component';
import { AppBrandingDemoComponent } from './app-branding/app-branding-demo.component';
import { FaviconDemoComponent } from './favicons/favicon-demo.component';
import { IconGuideV2Component } from './icons/icon-guide-v2.component';

const routes: Routes = [
    {
        path: 'foundations',
        component: FoundationsComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent,
                data: {title: 'UI Colors', category: 'Colors'}
            },
            {
                path: 'brand-colors',
                component: BrandColorDemoComponent,
                data: {title: 'Brand Colors', category: 'Colors'}
            },
            {
                path: 'fonts',
                component: FontsDemoComponent,
                data: {title: 'Fonts', category: 'Typography'}
            },
            {
                path: 'typography',
                component: TypographyDemoComponent,
                data: {title: 'Type', category: 'Typography'}
            },
            {
                path: 'icons',
                component: IconGuideV2Component,
                data: {title: 'Icons v2', category: 'Typography'}
            },
            {
                path: 'icons-legacy',
                component: IconGuideV1Component,
                data: {title: 'Icons v1 (Deprecated)', category: 'Typography'}
            },
            {
                path: 'Favicons',
                component: FaviconDemoComponent,
                data: {title: 'Favicon', category: 'Brand'}
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: {title: 'Source Code', category: 'Typography'}
            },
            {
                path: 'logo',
                component: LogoDemoComponent,
                data: {title: 'Logos', category: 'Brand'}
            },
            {
                path: 'products',
                component: ProductsDemoComponent,
                data: {title: 'Product Icons', category: 'Brand'}
            },
            {
                path: 'app-branding',
                component: AppBrandingDemoComponent,
                data: {title: 'App Title Generator', category: 'Brand'}
            },
            {
                path: 'ai-branding',
                component: AIDemoComponent,
                data: {title: 'Healthcare.AI Branding', category: 'Brand'}
            },
            {
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class FoundationsRoutesModule {}
