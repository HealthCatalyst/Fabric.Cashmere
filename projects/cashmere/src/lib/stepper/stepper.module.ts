import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StepperComponent} from './stepper.component';
import {IconModule} from '../icon/icon.module';

export {StepInterface} from './stepper.component';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule],
    exports: [StepperComponent],
    declarations: [StepperComponent]
})
export class StepperModule {}
