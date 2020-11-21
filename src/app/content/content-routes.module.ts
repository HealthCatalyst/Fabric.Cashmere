import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';

const routes: Routes = [
    {
        path: 'content',
        component: ContentComponent,
        children: [
            {
                path: 'trademarks',
                component: MarkdownContentComponent,
                data: {
                    title: 'Trademarks',
                    category: 'Brand',
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
