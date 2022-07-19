import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "../button/button.module";
import { ChipModule } from "../chip/chip.module";
import { IconModule } from "../icon/icon.module";
import { MeasurableModule } from "../measurable/measurable.module";
import { InstanceSwitcherComponent } from "./instance-switcher.component";

@NgModule({
    declarations: [
      InstanceSwitcherComponent
    ],
    imports: [
      CommonModule,
      ChipModule,
      ButtonModule,
      IconModule,
      MeasurableModule,
      ReactiveFormsModule
    ],
    exports: [
        InstanceSwitcherComponent
    ]
  })
  export class InstanceSwitcherModule { }
