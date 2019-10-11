import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../cashmere.module';
import {SidenavOverviewExampleComponent} from './sidenav-overview-example.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule, RouterModule],
    declarations: [SidenavOverviewExampleComponent],
    entryComponents: [SidenavOverviewExampleComponent]
})
export class SidenavOverviewExampleModule {}
