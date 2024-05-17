import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressSpinnerComponent} from './progress-spinner.component';
import {ProgressDotsComponent} from './progress-dots.component';
import {ProgressBarComponent} from './progress-bar.component';

@NgModule({
    imports: [CommonModule],
    exports: [ProgressSpinnerComponent, ProgressDotsComponent, ProgressBarComponent],
    declarations: [ProgressSpinnerComponent, ProgressDotsComponent, ProgressBarComponent]
})
export class ProgressIndicatorsModule {}
