import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {AnchorComponent} from './anchor.component';
import {SplitButtonComponent} from './split-button/split-button.component';
import {PopModule} from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, PopModule],
    declarations: [AnchorComponent, ButtonComponent, SplitButtonComponent],
    exports: [AnchorComponent, ButtonComponent, SplitButtonComponent, PopModule]
})
export class ButtonModule {}
