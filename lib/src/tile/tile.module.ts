import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        TileComponent
    ],
    declarations: [
        TileComponent
    ]
})
export class TileModule {
}
