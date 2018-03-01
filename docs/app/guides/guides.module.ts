import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesComponent } from './guides.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '../../../lib/public_api';
import { SubnavModule } from '../../../lib/src/subnav';
import { TileModule } from '../../../lib/src/tile';
import { RouterModule } from '@angular/router';
import { routes } from './guides-routes';
import { GuideComponent } from './guide/guide.component';
import { GuidesService } from './guides.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule,
    SubnavModule,
    TileModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [GuidesComponent, GuideComponent],
  providers: [GuidesService]
})
export class GuidesModule { }
