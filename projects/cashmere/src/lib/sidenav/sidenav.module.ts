import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {SidenavLinkComponent} from './sidenav-link/sidenav-link.component';
import {RouterModule} from '@angular/router';
import {IconModule} from '../icon/icon.module';
import {PopoverModule} from '../popover/popover.module';

@NgModule({
    imports: [CommonModule, RouterModule, IconModule, PopoverModule],
    declarations: [SidenavComponent, SidenavLinkComponent],
    exports: [SidenavComponent, SidenavLinkComponent]
})
export class SidenavModule {}
