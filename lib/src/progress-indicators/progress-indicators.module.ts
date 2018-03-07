import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { ProgressDotsComponent } from './progress-dots.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ProgressSpinnerComponent,
        ProgressDotsComponent
    ],
    declarations: [
        ProgressSpinnerComponent,
        ProgressDotsComponent
    ]
})
export class ProgressIndicatorsModule {
}
