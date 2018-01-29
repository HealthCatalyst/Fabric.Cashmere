import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        SelectComponent
    ],
    declarations: [
        SelectComponent
    ]
})
export class SelectModule { }
