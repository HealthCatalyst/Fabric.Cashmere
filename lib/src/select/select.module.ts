import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { SelectErrorDirective } from './select-errors.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SelectComponent,
        SelectErrorDirective
    ],
    declarations: [
        SelectComponent,
        SelectErrorDirective
    ]
})
export class SelectModule {
}
