import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurableComponent } from './measurable.component';
import { MeasurableService } from './measurable.service';



@NgModule({
  declarations: [
      MeasurableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      MeasurableComponent
  ],
  providers: [
      MeasurableService
  ]
})
export class MeasurableModule { }
