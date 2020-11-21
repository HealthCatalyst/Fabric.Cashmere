import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoundationsComponent} from './foundations.component';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideComponent} from './icons/icon-guide.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';

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
                path: 'typography',
                component: TypographyDemoComponent,
                data: {title: 'Type', category: 'Typography'}
            },
            {
                path: 'icons',
                component: IconGuideComponent,
                data: {title: 'Icons', category: 'Typography'}
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: {title: 'Source Code', category: 'Typography'}
            },
            {
                path: 'logo',
                component: LogoDemoComponent,
                data: {title: 'Logo', category: 'Brand'}
            },
            {
                path: 'products',
                component: ProductsDemoComponent,
                data: {title: 'Product Icons', category: 'Brand'}
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
