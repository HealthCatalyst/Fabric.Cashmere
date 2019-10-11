import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../../shared/cashmere.module';
import {SidenavDemoComponent} from './sidenav-demo.component';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule, LayoutModule],
    declarations: [SidenavDemoComponent],
    entryComponents: [SidenavDemoComponent]
})
export class SidenavDemoModule {}
