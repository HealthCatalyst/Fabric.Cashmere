import {NgModule} from '@angular/core';
import {CashmereModule} from '../cashmere.module';
import {BusyIndicatorOverviewExampleComponent} from './busy-indicator-overview-example.component';

@NgModule({
    imports: [CashmereModule],
    declarations: [BusyIndicatorOverviewExampleComponent],
    entryComponents: [BusyIndicatorOverviewExampleComponent]
})
export class BusyIndicatorOverviewExampleModule {
}
