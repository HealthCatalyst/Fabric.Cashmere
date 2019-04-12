import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {AnchorComponent} from './anchor.component';
import {ButtonItemDirective} from './split-button/directives/button-item.directive';
import {MenuIconDirective} from './split-button/directives/menu-icon.directive';
import {MenuTextDirective} from './split-button/directives/menu-text.directive';
import {MenuSubTextDirective} from './split-button/directives/menu-sub-text.directive';
import {DividerDirective} from './split-button/directives/divider.directive';
import {SplitButtonComponent} from './split-button/split-button.component';
import { PopModule } from '../pop/popover.module';

@NgModule({
    imports: [CommonModule, PopModule],
    declarations: [
        AnchorComponent,
        ButtonComponent,
        ButtonItemDirective,
        SplitButtonComponent,
        MenuIconDirective,
        MenuTextDirective,
        MenuSubTextDirective,
        DividerDirective
    ],
    exports: [
        AnchorComponent,
        ButtonComponent,
        ButtonItemDirective,
        SplitButtonComponent,
        MenuIconDirective,
        MenuTextDirective,
        MenuSubTextDirective,
        DividerDirective
    ]
})
export class ButtonModule {}
