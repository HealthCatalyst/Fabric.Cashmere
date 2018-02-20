import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { ChipRowComponent } from './chip-row/chip-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ChipComponent,
        FilterButtonComponent,
        ChipRowComponent
    ],
    declarations: [
        ChipComponent,
        FilterButtonComponent,
        ChipRowComponent
    ]
})
export class ChipModule {
}
