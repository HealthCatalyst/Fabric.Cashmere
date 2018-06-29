import {NgModule} from '@angular/core';
import {ComponentViewerComponent} from './component-viewer.component';
import {ComponentApiComponent} from './component-api/component-api.component';
import {SharedModule} from '../../shared/shared.module';
import {ComponentExamplesComponent} from './component-examples/component-examples.component';
import {ExampleViewerComponent} from './component-examples/example-viewer/example-viewer.component';
import {DocumentViewerComponent} from './component-api/document-viewer/document-viewer.component';
import {CashmereExampleModule} from '@healthcatalyst/cashmere-examples';

@NgModule({
    imports: [SharedModule, CashmereExampleModule],
    declarations: [
        ComponentViewerComponent,
        ComponentApiComponent,
        DocumentViewerComponent,
        ComponentExamplesComponent,
        ExampleViewerComponent
    ]
})
export class ComponentViewerModule {}
