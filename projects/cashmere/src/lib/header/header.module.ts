import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {IconModule} from '../icon/icon.module';
import {PopModule} from '../pop/popover.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [CommonModule, IconModule, PopModule, RouterModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule {
}
