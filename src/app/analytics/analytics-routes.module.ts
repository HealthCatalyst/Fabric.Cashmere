import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnalyticsComponent} from './analytics.component';
import {AnalyticsTemplateComponent} from './template/analytics-template.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';

const routes: Routes = [
    {
        path: 'analytics',
        component: AnalyticsComponent,
        children: [
            {
                path: 'qlik-template',
                component: AnalyticsTemplateComponent,
                data: {
                    title: 'Template',
                    category: 'Qlik'
                }
            },
            {
                path: 'qlik-foundations',
                component: MarkdownContentComponent,
                data: {
                    title: 'Foundations',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/foundations.md')
                }
            },
            {
                path: 'qlik-navbar',
                component: MarkdownContentComponent,
                data: {
                    title: 'Navbar',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/navbar.md')
                }
            },
            {
                path: 'qlik-about',
                component: MarkdownContentComponent,
                data: {
                    title: 'About Page',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/about.md')
                }
            },
            {
                path: 'qlik-filters',
                component: MarkdownContentComponent,
                data: {
                    title: 'Filters',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/filters.md')
                }
            },
            {
                path: 'qlik-tabs',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tabs',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/tabs.md')
                }
            },
            {
                path: 'qlik-metrics',
                component: MarkdownContentComponent,
                data: {
                    title: 'KPI Metrics',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/kpi-metrics.md')
                }
            },
            {
                path: 'qlik-charts',
                component: MarkdownContentComponent,
                data: {
                    title: 'Charts',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/charts.md')
                }
            },
            {
                path: 'qlik-tables',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tables',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/tables.md')
                }
            },
            {
                path: 'qlik-sense',
                component: MarkdownContentComponent,
                data: {
                    title: 'Qlik Sense',
                    category: 'Qlik',
                    document: require('raw-loader!../../../guides/analytics/qlik/qliksense.md')
                }
            },
            {
                path: 'tableau-template',
                component: AnalyticsTemplateComponent,
                data: {
                    title: 'Template',
                    category: 'Tableau'
                }
            },
            {
                path: 'tableau-foundations',
                component: MarkdownContentComponent,
                data: {
                    title: 'Foundations',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/foundations.md')
                }
            },
            {
                path: 'tableau-navbar',
                component: MarkdownContentComponent,
                data: {
                    title: 'Navbar',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/navbar.md')
                }
            },
            {
                path: 'tableau-about',
                component: MarkdownContentComponent,
                data: {
                    title: 'About Page',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/about.md')
                }
            },
            {
                path: 'tableau-filters',
                component: MarkdownContentComponent,
                data: {
                    title: 'Filters',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/filters.md')
                }
            },
            {
                path: 'tableau-tabs',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tabs',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/tabs.md')
                }
            },
            {
                path: 'tableau-metrics',
                component: MarkdownContentComponent,
                data: {
                    title: 'KPI Metrics',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/kpi-metrics.md')
                }
            },
            {
                path: 'tableau-charts',
                component: MarkdownContentComponent,
                data: {
                    title: 'Charts',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/charts.md')
                }
            },
            {
                path: 'tableau-tables',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tables',
                    category: 'Tableau',
                    document: require('raw-loader!../../../guides/analytics/tableau/tables.md')
                }
            },
            {
                path: 'powerbi-template',
                component: AnalyticsTemplateComponent,
                data: {
                    title: 'Template',
                    category: 'Power BI'
                }
            },
            {
                path: 'powerbi-foundations',
                component: MarkdownContentComponent,
                data: {
                    title: 'Foundations',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/foundations.md')
                }
            },
            {
                path: 'powerbi-navbar',
                component: MarkdownContentComponent,
                data: {
                    title: 'Navbar',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/navbar.md')
                }
            },
            {
                path: 'powerbi-about',
                component: MarkdownContentComponent,
                data: {
                    title: 'About Page',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/about.md')
                }
            },
            {
                path: 'powerbi-filters',
                component: MarkdownContentComponent,
                data: {
                    title: 'Filters',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/filters.md')
                }
            },
            {
                path: 'powerbi-tabs',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tabs',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/tabs.md')
                }
            },
            {
                path: 'powerbi-metrics',
                component: MarkdownContentComponent,
                data: {
                    title: 'KPI Metrics',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/kpi-metrics.md')
                }
            },
            {
                path: 'powerbi-charts',
                component: MarkdownContentComponent,
                data: {
                    title: 'Charts',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/charts.md')
                }
            },
            {
                path: 'powerbi-tables',
                component: MarkdownContentComponent,
                data: {
                    title: 'Tables',
                    category: 'Power BI',
                    document: require('raw-loader!../../../guides/analytics/powerbi/tables.md')
                }
            },
            {
                path: '**',
                redirectTo: 'qlik-template'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AnalyticsRoutesModule {}
