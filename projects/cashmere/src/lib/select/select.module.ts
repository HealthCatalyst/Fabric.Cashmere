import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SelectComponent} from './select.component';
import {HcOptionDirective} from './hc-option.directive';
import {ObserversModule} from '@angular/cdk/observers';

@NgModule({
    imports: [CommonModule, FormsModule, ObserversModule],
    exports: [SelectComponent, HcOptionDirective],
    declarations: [SelectComponent, HcOptionDirective]
})
export class SelectModule {}
