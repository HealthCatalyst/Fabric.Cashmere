import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsComponent } from './vertical-tabs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    VerticalTabComponent,
    VerticalTabsComponent
    ],
  exports: [
    VerticalTabComponent,
    VerticalTabsComponent
    ]
})
export class VerticalTabsModule { }