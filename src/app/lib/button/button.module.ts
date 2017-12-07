import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule { }
