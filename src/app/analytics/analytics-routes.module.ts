import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnalyticsComponent} from './analytics.component';
import {ChartDemoComponent} from './chart/chart-demo.component';

const routes: Routes = [
    {
        path: 'analytics',
        component: AnalyticsComponent,
        children: [
            {
                path: 'charts',
                component: ChartDemoComponent,
                data: {title: 'Charts', category: 'Web'}
            },
            {
                path: '**',
                redirectTo: 'charts'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutesModule {}
