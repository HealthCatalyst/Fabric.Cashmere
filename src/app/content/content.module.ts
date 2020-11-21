import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ContentRoutesModule} from './content-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {ContentComponent} from './content.component';

@NgModule({
    imports: [SharedModule, ContentRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        ContentComponent
    ]
})
export class ContentModule {}
