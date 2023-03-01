import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';
import {PersonaOrgComponent} from './personas/persona-org/persona-org.component';
import {PersonaListComponent} from './personas/persona-list/persona-list.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {PersonaViewerComponent} from './personas/persona-viewer/persona-viewer.component';
import {UsageComponent} from './usage/usage.component';
import {ProductPersonasViewerComponent} from './personas/product-personas-viewer/product-personas-viewer.component';
import {ProductCentricIndexComponent} from './personas/product-centric-index/product-centric-index.component';

const routes: Routes = [
    {
        path: 'content',
        component: ContentComponent,
        children: [
            {
                path: 'usage',
                component: UsageComponent,
                data: {
                    title: 'Usage',
                    category: 'Brand'
                }
            },
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
                path: 'references',
                component: MarkdownContentComponent,
                data: {
                    title: 'References',
                    category: 'Brand',
                    document: require('raw-loader!../../../guides/content/references.md')
                }
            },
            {
                path: 'org-chart',
                component: PersonaOrgComponent,
                data: {
                    title: 'Organization Chart',
                    category: 'User Personas'
                }
            },
            {
                path: 'personas',
                component: PersonaListComponent,
                data: {
                    title: 'Persona List',
                    category: 'User Personas'
                },
                children: [
                    {
                        path: ':id',
                        component: PersonaViewerComponent
                    }
                ]
            },
            {
                path: 'products',
                component: ProductCentricIndexComponent,
                data: {
                    title: 'Personas by Product',
                    category: 'User Personas'
                },
                children: [
                    {
                        path: ':id',
                        component: ProductPersonasViewerComponent
                    }
                ]
            },
            {
                path: 'ux-writing-overview',
                component: MarkdownContentComponent,
                data: {
                    title: 'Overview',
                    category: 'UX Writing',
                    document: require('raw-loader!../../../guides/content/ux-writing-overview.md')
                }
            },
            {
                path: 'ux-writing-accessibility',
                component: MarkdownContentComponent,
                data: {
                    title: 'Accessibility',
                    category: 'UX Writing',
                    document: require('raw-loader!../../../guides/content/ux-writing-accessibility.md')
                }
            },
            {
                path: 'ux-writing-writing-choices',
                component: MarkdownContentComponent,
                data: {
                    title: 'Writing Choices',
                    category: 'UX Writing',
                    document: require('raw-loader!../../../guides/content/ux-writing-writing-choices.md')
                }
            },
            {
                path: 'ux-writing-ux-elements',
                component: MarkdownContentComponent,
                data: {
                    title: 'UX Elements',
                    category: 'UX Writing',
                    document: require('raw-loader!../../../guides/content/ux-writing-ux-elements.md')
                }
            },
            {
                path: 'ux-writing-resources',
                component: MarkdownContentComponent,
                data: {
                    title: 'Resources',
                    category: 'UX Writing',
                    document: require('raw-loader!../../../guides/content/ux-writing-resources.md')
                }
            },
            {
                path: '**',
                redirectTo: 'usage'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class ContentRoutesModule {}
