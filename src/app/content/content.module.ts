import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {ContentRoutesModule} from './content-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {ContentComponent} from './content.component';
import {MarkdownContentComponent} from './markdown-content.component';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';
import {UsageComponent} from './usage/usage.component';
import {UsageListComponent} from './usage/usage-list/usage-list.component';


@NgModule({
    imports: [SharedModule, ContentRoutesModule, FormsModule, ReactiveFormsModule, NgSelectModule],
    providers: [ApplicationInsightsService],
    declarations: [
        ContentComponent,
        MarkdownContentComponent,
        LogoDemoComponent,
        ProductsDemoComponent,
        UsageComponent,
        UsageListComponent,
    ]
})
export class ContentModule {}
