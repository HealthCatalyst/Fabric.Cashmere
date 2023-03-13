import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StylesComponent} from './styles.component';
import {AboutModalComponent} from './about/about-modal.component';
import {TableDemoComponent} from './table/table-demo.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {IESupportComponent} from './ie-support/ie-support.component';
import {ChartDemoComponent} from './chart/chart-demo.component';

const routes: Routes = [
    {
        path: 'web/styles',
        component: StylesComponent,
        children: [
            {
                path: 'launch-screen',
                component: MarkdownContentComponent,
                data: {
                    title: 'Launch Screen',
                    category: 'Screens & Messaging',
                    document: require('../../../guides/styles/launch-screen.md')
                }
            },
            {
                path: 'login',
                component: MarkdownContentComponent,
                data: {
                    title: 'Login Screen',
                    category: 'Screens & Messaging',
                    document: require('../../../guides/styles/login.md')
                }
            },
            {
                path: 'logout',
                component: MarkdownContentComponent,
                data: {
                    title: 'Logout Screen',
                    category: 'Screens & Messaging',
                    document: require('../../../guides/styles/logout.md')
                }
            },
            {
                path: 'error',
                component: MarkdownContentComponent,
                data: {
                    title: 'Error Pages',
                    category: 'Screens & Messaging',
                    document: require('../../../guides/styles/error.md')
                }
            },
            {
                path: 'ie-support',
                component: IESupportComponent,
                data: {title: 'IE Support Messaging', category: 'Screens & Messaging'}
            },
            {
                path: 'about',
                component: AboutModalComponent,
                data: {title: 'About Modal', category: 'Screens & Messaging'}
            },
            {
                path: 'charts',
                component: ChartDemoComponent,
                data: {title: 'Charts', category: 'Data Visualization'}
            },
            {
                path: 'breadcrumbs',
                component: MarkdownContentComponent,
                data: {
                    title: 'Breadcrumbs',
                    category: 'User Interface',
                    document: require('../../../guides/styles/breadcrumbs.md')
                }
            },
            {
                path: 'file-icons',
                component: MarkdownContentComponent,
                data: {
                    title: 'File Icons',
                    category: 'User Interface',
                    document: require('../../../guides/styles/file-icons.md')
                }
            },
            {
                path: 'table',
                component: TableDemoComponent,
                data: {title: 'Tables', category: 'User Interface'}
            },
            {
                path: '**',
                redirectTo: 'launch-screen'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class StylesRoutesModule {}
