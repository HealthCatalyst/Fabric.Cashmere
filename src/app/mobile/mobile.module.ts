import {NgModule} from '@angular/core';
import {MobileDevComponent} from './mobile.component';
import {SharedModule} from '../shared/shared.module';
import {MobileRoutesModule} from './mobile-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@NgModule({
    imports: [SharedModule, MobileRoutesModule],
    declarations: [MobileDevComponent],
    providers: [ApplicationInsightsService]
})
export class MobileDevModule {}
