import {NgModule} from '@angular/core';
import {AccessibilityComponent} from './accessibility.component';
import {SharedModule} from '../shared/shared.module';
import {AccessibilityRoutesModule} from './accessibility-routes.module';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@NgModule({
    imports: [SharedModule, AccessibilityRoutesModule],
    declarations: [AccessibilityComponent],
    providers: [ApplicationInsightsService]
})
export class AccessibilityModule {}
