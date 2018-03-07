import { Routes } from '@angular/router';
import { StylesComponent } from './styles.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { CodeDemoComponent } from './code/code-demo.component';

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
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];
