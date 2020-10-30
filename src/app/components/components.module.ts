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
import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function getHljsLanguages() {
    return [
        {name: 'typescript', func: () => import('highlight.js/lib/languages/typescript')},
        {name: 'scss', func: () => import('highlight.js/lib/languages/scss')},
        {name: 'xml', func: () => import('highlight.js/lib/languages/xml')}
    ];
}

@NgModule({
    imports: [SharedModule, ExampleModule, ComponentsRouterModule, HighlightModule],
    providers: [
        ApplicationInsightsService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {languages: getHljsLanguages, lineNumbers: true}
        }
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
