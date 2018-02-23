import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip.component';
import { ChipRowComponent } from './chip-row/chip-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ChipComponent,
        ChipRowComponent
    ],
    declarations: [
        ChipComponent,
        ChipRowComponent
    ]
})
export class ChipModule {
}
