import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ComponentsComponent} from './components.component';
import {ComponentApiComponent} from './component-viewer/component-api/component-api.component';
import {ComponentExamplesComponent} from './component-viewer/component-examples/component-examples.component';
import {ComponentUsageComponent} from './component-viewer/component-usage/component-usage.component';

const routes: Route[] = [
    {
        path: 'web/components',
        component: ComponentsComponent,
    },
    {
        path: `web/components/:id`,
        component: ComponentsComponent,
        children: [
            {path: 'api', component: ComponentApiComponent, pathMatch: 'full'},
            {path: 'examples', component: ComponentExamplesComponent, pathMatch: 'full'},
            {path: 'usage', component: ComponentUsageComponent, pathMatch: 'full'},
            {path: '**', redirectTo: 'examples'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class ComponentsRouterModule {}
