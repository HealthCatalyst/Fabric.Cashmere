import { SelectIntegrationTestComponent } from './select-integration-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../lib/select/select.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule
    ],
    declarations: [SelectIntegrationTestComponent]
})
export class SelectIntegrationTestModule {
}
