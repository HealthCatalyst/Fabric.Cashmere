import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrawerComponent} from './drawer.component';
import {DrawerContainerComponent} from './drawer-container.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DrawerComponent, DrawerContainerComponent],
    exports: [DrawerComponent, DrawerContainerComponent]
})
export class DrawerModule {}
