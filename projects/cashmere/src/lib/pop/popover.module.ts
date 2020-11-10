import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';

import {HcPopComponent} from './popover.component';
import {HcTooltipComponent} from './tooltip/tooltip.component';
import {HcPopoverAnchorDirective} from './directives/popover-anchor.directive';

import {MenuItemDirective} from './directives/menu-item.directive';
import {MenuDirective} from './directives/menu.directive';
import {MenuIconDirective} from './directives/menu-icon.directive';
import {MenuTextDirective} from './directives/menu-text.directive';
import {MenuSubTextDirective} from './directives/menu-sub-text.directive';
import {DividerDirective} from './directives/divider.directive';
import {HcPopoverAccessibilityService} from './popover-accessibility.service';

@NgModule({
    imports: [CommonModule, OverlayModule, A11yModule, BidiModule],
    declarations: [
        HcPopComponent,
        HcTooltipComponent,
        HcPopoverAnchorDirective,
        MenuDirective,
        MenuItemDirective,
        MenuIconDirective,
        MenuTextDirective,
        MenuSubTextDirective,
        DividerDirective
    ],
    exports: [
        HcPopComponent,
        HcTooltipComponent,
        HcPopoverAnchorDirective,
        BidiModule,
        MenuDirective,
        MenuItemDirective,
        MenuIconDirective,
        MenuTextDirective,
        MenuSubTextDirective,
        DividerDirective
    ],
    entryComponents: [HcTooltipComponent],
    providers: [HcPopoverAccessibilityService]
})
export class PopModule {}
