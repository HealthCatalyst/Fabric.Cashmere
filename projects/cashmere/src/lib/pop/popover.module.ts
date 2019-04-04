import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';

import { HcPopComponent } from './popover.component';
import { HcPopoverAnchorDirective } from './popover-anchor.directive';
import { HcPopoverHoverDirective } from './popover-hover.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
    BidiModule,
  ],
  declarations: [
    HcPopComponent,
    HcPopoverAnchorDirective,
    HcPopoverHoverDirective,
  ],
  exports: [
    HcPopComponent,
    HcPopoverAnchorDirective,
    HcPopoverHoverDirective,
    BidiModule,
  ]
})
export class PopModule { }
