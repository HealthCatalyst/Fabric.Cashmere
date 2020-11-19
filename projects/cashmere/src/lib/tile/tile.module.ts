import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TileComponent} from './tile.component';
import {TileHeaderDirective} from './tile-header.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TileComponent, TileHeaderDirective],
    declarations: [TileComponent, TileHeaderDirective]
})
export class TileModule {}
