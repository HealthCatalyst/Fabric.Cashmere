import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { InputErrorDirective } from './input-errors.directive';
import { InputRequiredDirective } from './input-required.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        InputComponent,
        InputErrorDirective,
        InputRequiredDirective
    ],
    declarations: [
        InputComponent,
        InputErrorDirective,
        InputRequiredDirective
    ]
})
export class InputModule {
}
