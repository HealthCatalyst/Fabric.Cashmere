import {NgModule} from '@angular/core';
import {ComponentViewerComponent} from './component-viewer/component-viewer.component';
import {ComponentApiComponent} from './component-viewer/component-api/component-api.component';
import {SharedModule} from '../shared/shared.module';
import {ComponentExamplesComponent} from './component-viewer/component-examples/component-examples.component';
import {ExampleViewerComponent} from './component-viewer/component-examples/example-viewer/example-viewer.component';
import {DocumentViewerComponent} from './component-viewer/shared/document-viewer/document-viewer.component';
import {ExampleModule} from '@healthcatalyst/cashmere-examples';
import {ComponentUsageComponent} from './component-viewer/component-usage/component-usage.component';
import {ComponentsComponent} from './components.component';
import {ComponentsRouterModule} from './components-router.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@NgModule({
    imports: [SharedModule, ExampleModule, ComponentsRouterModule],
    providers: [ApplicationInsightsService],
    declarations: [
        ComponentsComponent,
        ComponentViewerComponent,
        ComponentApiComponent,
        DocumentViewerComponent,
        ComponentExamplesComponent,
        ExampleViewerComponent,
        ComponentUsageComponent
    ]
})
export class ComponentsModule {}
