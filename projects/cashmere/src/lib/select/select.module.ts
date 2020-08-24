import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SelectComponent} from './select.component';
import {HcOptionDirective} from './hc-option.directive';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [SelectComponent, HcOptionDirective],
    declarations: [SelectComponent, HcOptionDirective]
})
export class SelectModule {}
