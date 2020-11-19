import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';
import {MarkdownContentComponent} from './markdown-content.component';

const routes: Routes = [
    {
        path: 'content',
        component: ContentComponent,
        children: [
            {
                path: 'logo',
                component: LogoDemoComponent,
                data: {title: 'Logo', category: 'Branding'}
            },
            {
                path: 'products',
                component: ProductsDemoComponent,
                data: {title: 'Product Icons', category: 'Branding'}
            },
            {
                path: 'trademarks',
                component: MarkdownContentComponent,
                data: {
                    title: 'Trademarks',
                    category: 'Branding',
                    document: require('raw-loader!../../../guides/content/trademarks.md')
                }
            },
            {
                path: '**',
                redirectTo: 'logo'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ContentRoutesModule {}
