import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorComponent } from './anchor.component';
import { IconModule } from '../icon';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    ButtonComponent,
    AnchorComponent
  ],
  exports: [
    ButtonComponent,
    AnchorComponent
  ]
})
export class ButtonModule {
}
