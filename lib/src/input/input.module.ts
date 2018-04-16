import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { IconModule } from '../icon/icon.module';
import { InputIconDirective } from './input-icon.directive';
import { InputClearDirective } from './input-clear.directive';
import { ClearInputBtnComponent } from './clear-input-btn.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule
    ],
    exports: [
        InputComponent,
        InputIconDirective,
        InputClearDirective,
        ClearInputBtnComponent
    ],
    declarations: [
        InputComponent,
        InputIconDirective,
        InputClearDirective,
        ClearInputBtnComponent
    ]
})
export class InputModule {
}
