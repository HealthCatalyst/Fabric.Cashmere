import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {HcOptionDirective} from './hc-option.directive';

@NgModule({
    imports: [CommonModule],
    exports: [SelectComponent, HcOptionDirective],
    declarations: [SelectComponent, HcOptionDirective]
})
export class SelectModule {}
