import {NgModule} from '@angular/core';
import {GuidesComponent} from './guides.component';
import {GuideComponent} from './guide/guide.component';
import {GuidesService} from './guides.service';
import {SharedModule} from '../shared/shared.module';
import {GuidesRoutesModule} from './guides-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@NgModule({
    imports: [SharedModule, GuidesRoutesModule],
    declarations: [GuidesComponent, GuideComponent],
    providers: [GuidesService, ApplicationInsightsService]
})
export class GuidesModule {}
