import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabSetComponent } from './tab-set.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabComponent,
    TabSetComponent
    ],
  exports: [
    TabComponent,
    TabSetComponent
    ]
})
export class TabsModule { }