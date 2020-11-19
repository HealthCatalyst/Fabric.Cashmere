import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ContentRoutesModule} from './content-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {ContentComponent} from './content.component';
import {MarkdownContentComponent} from './markdown-content.component';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';

@NgModule({
    imports: [SharedModule, ContentRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        ContentComponent,
        MarkdownContentComponent,
        LogoDemoComponent,
        ProductsDemoComponent,
    ]
})
export class ContentModule {}
