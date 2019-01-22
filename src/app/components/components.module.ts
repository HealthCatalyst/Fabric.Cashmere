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
import {HighlightModule} from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
    return [{name: 'typescript', func: typescript}, {name: 'scss', func: scss}, {name: 'xml', func: xml}];
}

@NgModule({
    imports: [
        SharedModule,
        ExampleModule,
        ComponentsRouterModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        })
    ],
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
