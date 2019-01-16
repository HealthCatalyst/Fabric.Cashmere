/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

export { DialogModule } from './dialog-module';
export {
    HC_DIALOG_DATA,
    HC_DIALOG_DEFAULT_OPTIONS,
    HC_DIALOG_SCROLL_STRATEGY,
    HC_DIALOG_SCROLL_STRATEGY_FACTORY,
    HC_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
    HC_DIALOG_SCROLL_STRATEGY_PROVIDER,
    DialogService
} from './dialog.service';
export { throwHcDialogContentAlreadyAttachedError, DialogContainerComponent } from './dialog-container.component';
export { DialogCloseDirective, DialogTitleDirective, DialogContentDirective, DialogActionsDirective } from './dialog-content-directives';
export { DialogRole, DialogPosition, HcDialogConfig } from './dialog-config';
export { HcDialogRef } from './dialog-ref';
export { hcDialogAnimations } from './dialog-animations';
