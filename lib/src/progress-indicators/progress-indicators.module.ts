import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ProgressSpinnerComponent
    ],
    declarations: [
        ProgressSpinnerComponent
    ]
})
export class ProgressIndicatorsModule {
}
