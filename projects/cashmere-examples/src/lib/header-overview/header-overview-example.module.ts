import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../cashmere.module';
import {RouterModule} from '@angular/router';
import {HeaderOverviewExampleComponent} from './header-overview-example.component';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule, RouterModule],
    declarations: [HeaderOverviewExampleComponent],
    entryComponents: [HeaderOverviewExampleComponent]
})
export class HeaderOverviewExampleModule {
}
