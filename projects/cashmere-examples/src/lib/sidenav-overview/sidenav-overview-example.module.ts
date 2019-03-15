import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../cashmere.module';
import {SidenavOverviewExampleComponent} from './sidenav-overview-example.component';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule],
    declarations: [SidenavOverviewExampleComponent],
    entryComponents: [SidenavOverviewExampleComponent]
})
export class SidenavOverviewExampleModule {}
