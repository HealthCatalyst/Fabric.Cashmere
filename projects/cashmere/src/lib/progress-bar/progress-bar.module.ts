import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconModule} from '../icon/icon.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {SelectModule} from '../select/select.module';
import {ProgressBarComponent} from './progress-bar.component';

@NgModule({
    imports: [CommonModule, IconModule, FormFieldModule, SelectModule],
    exports: [ProgressBarComponent],
    declarations: [ProgressBarComponent]
})
export class ProgressBarModule {}
