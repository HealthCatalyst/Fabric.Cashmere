import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HcTooltipComponent} from './tooltip.component';
import {PopModule} from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, PopModule],
    exports: [HcTooltipComponent],
    declarations: [HcTooltipComponent]
})
export class TooltipModule {}
