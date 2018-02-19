import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { GuidesComponent } from './guides.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '../../../lib/public_api';
import { SubnavModule } from '../../../lib/src/subnav';
import { TileModule } from '../../../lib/src/tile';
import { RouterModule } from '@angular/router';
import { routes } from './guides-routes';
import { MarkdownDirective } from '../markdown.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule,
    SubnavModule,
    TileModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [GettingStartedComponent, GuidesComponent, MarkdownDirective]
})
export class GuidesModule { }
