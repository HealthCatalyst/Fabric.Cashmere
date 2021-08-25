import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ContentRoutesModule} from './content-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {API_KEY, GoogleSheetsDbService} from 'ng-google-sheets-db';
import {ContentComponent} from './content.component';
import {UsageComponent} from './usage/usage.component';
import {UsageListComponent} from './usage/usage-list/usage-list.component';
import {PersonaModule} from './personas/persona.module';

@NgModule({
    imports: [SharedModule, ContentRoutesModule, PersonaModule],
    providers: [ApplicationInsightsService, GoogleSheetsDbService, {provide: API_KEY, useValue:'AIzaSyCEEE_ybsFiFb0ahWGUtQnB0731d0dI1kY'}],
    declarations: [
        ContentComponent,
        UsageComponent,
        UsageListComponent
    ]
})
export class ContentModule {}
