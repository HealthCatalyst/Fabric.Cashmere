import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectErrorDirective } from './select-errors.directive';
import { SelectRequiredDirective } from './select-required.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SelectComponent,
        SelectErrorDirective,
        SelectRequiredDirective
    ],
    declarations: [
        SelectComponent,
        SelectErrorDirective,
        SelectRequiredDirective
    ]
})
export class SelectModule {
}
