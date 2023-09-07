import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Drawer} from './drawer.component';
import {DrawerContainer} from './drawer-container.component';
import {MenuDrawer} from './menu-drawer/menu-drawer.component';
import {DrawerItem} from './menu-drawer/drawer-item.component';
import {DrawerToolbar} from './menu-drawer/drawer-header.directive';
import { BackdropModule } from '../backdrop/backdrop.module';

const exportedComponents = [Drawer, DrawerContainer, MenuDrawer, DrawerItem, DrawerToolbar];

@NgModule({
    imports: [CommonModule, BackdropModule],
    declarations: exportedComponents,
    exports: exportedComponents
})
export class DrawerModule {}
