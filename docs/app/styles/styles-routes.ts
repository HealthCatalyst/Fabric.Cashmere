import { Routes } from '@angular/router';
import { StylesComponent } from './styles.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { CodeDemoComponent } from './code/code-demo.component';
import { ChartDemoComponent } from './chart/chart-demo.component';
import { ErrorPagesComponent } from './error/error-pages.component';

export const routes: Routes = [
    {
        path: 'styles',
        component: StylesComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent,
                data: { title: 'Colors' }
            },
            {
                path: 'table',
                component: TableDemoComponent,
                data: { title: 'Tables' }
            },
            {
                path: 'chart',
                component: ChartDemoComponent,
                data: { title: 'Charts' }
            },
            {
                path: 'typography',
                component: TypographyDemoComponent,
                data: { title: 'Typography' }
            },
            {
                path: 'code',
                component: CodeDemoComponent,
                data: { title: 'Code' }
            },
            {
                path: 'error',
                component: ErrorPagesComponent,
                data: { title: 'Error Pages' }
            },
            {
                path: '**',
                redirectTo: 'chart'
            }
        ]
    }
];
