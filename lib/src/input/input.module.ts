import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { InputIconDirective } from './input-icon.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        InputComponent,
        InputIconDirective
    ],
    declarations: [
        InputComponent,
        InputIconDirective
    ]
})
export class InputModule {
}
