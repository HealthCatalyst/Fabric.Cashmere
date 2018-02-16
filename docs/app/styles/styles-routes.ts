import { Routes } from '@angular/router';
import { StylesComponent } from './styles.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { TableDemoComponent } from './table/table-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';

export const routes: Routes = [
    {
        path: 'styles',
        component: StylesComponent,
        children: [
            {
                path: 'color',
                component: ColorDemoComponent
            },
            {
                path: 'table',
                component: TableDemoComponent
            },
            {
                path: 'typography',
                component: TypographyDemoComponent
            },
            {
                path: '**',
                redirectTo: 'color'
            }
        ]
    }
];
