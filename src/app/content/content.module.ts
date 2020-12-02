import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ContentRoutesModule} from './content-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {ContentComponent} from './content.component';
import {PersonaModule} from './personas/persona.module';

@NgModule({
    imports: [SharedModule, ContentRoutesModule, PersonaModule],
    providers: [ApplicationInsightsService],
    declarations: [
        ContentComponent
    ]
})
export class ContentModule {}
