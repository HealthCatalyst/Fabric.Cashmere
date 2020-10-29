import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {PopModule} from '../pop/popover.module';
import { ButtonToggleGroupDirective } from '.';
import { ButtonToggleComponent } from './button-toggle.component';

@NgModule({
    imports: [CommonModule, PopModule],
    declarations:  [ButtonToggleComponent],
    exports: [ButtonToggleComponent, ButtonToggleGroupDirective, PopModule]
})
export class ButtonToggleModule {}
