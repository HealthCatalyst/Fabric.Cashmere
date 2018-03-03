import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { InputErrorDirective } from './input-errors.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        InputComponent,
        InputErrorDirective
    ],
    declarations: [
        InputComponent,
        InputErrorDirective
    ]
})
export class InputModule {
}
