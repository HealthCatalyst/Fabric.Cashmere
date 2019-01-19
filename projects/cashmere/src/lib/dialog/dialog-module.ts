/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
// import {MatCommonModule} from '@angular/material/core';
import {HC_DIALOG_SCROLL_STRATEGY_PROVIDER, DialogService} from './dialog.service';
import {DialogContainerComponent} from './dialog-container.component';
import {DialogActionsDirective, DialogCloseDirective, DialogContentDirective, DialogTitleDirective} from './dialog-content-directives';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
        // MatCommonModule,
    ],
    exports: [
        DialogContainerComponent,
        DialogCloseDirective,
        DialogTitleDirective,
        DialogContentDirective,
        DialogActionsDirective
        // MatCommonModule,
    ],
    declarations: [DialogContainerComponent, DialogCloseDirective, DialogTitleDirective, DialogActionsDirective, DialogContentDirective],
    providers: [DialogService, HC_DIALOG_SCROLL_STRATEGY_PROVIDER],
    entryComponents: [DialogContainerComponent]
})
export class DialogModule {}
