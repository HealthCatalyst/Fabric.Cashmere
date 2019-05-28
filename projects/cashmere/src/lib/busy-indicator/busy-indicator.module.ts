import {NgModule} from '@angular/core';
import {BusyIndicatorComponent} from './busy-indicator.component';
import {ProgressIndicatorsModule} from '../progress-indicators/index';

@NgModule({
    imports: [ProgressIndicatorsModule],
    exports: [BusyIndicatorComponent],
    declarations: [BusyIndicatorComponent]
})
export class BusyIndicatorModule {
}
