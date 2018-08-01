import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ComponentsComponent} from './components.component';
import {ComponentViewerComponent} from './component-viewer/component-viewer.component';
import {ComponentApiComponent} from './component-viewer/component-api/component-api.component';
import {ComponentExamplesComponent} from './component-viewer/component-examples/component-examples.component';
import {ComponentUsageComponent} from './component-viewer/component-usage/component-usage.component';

const routes: Route[] = [
    {
        path: 'components',
        component: ComponentsComponent,
        children: [
            {
                path: ':id',
                component: ComponentViewerComponent,
                children: [
                    {path: 'api', component: ComponentApiComponent, pathMatch: 'full'},
                    {path: 'examples', component: ComponentExamplesComponent, pathMatch: 'full'},
                    {path: 'usage', component: ComponentUsageComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'api'}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRouterModule {}
