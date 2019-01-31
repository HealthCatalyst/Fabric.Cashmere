/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */
import {animate, state, style, transition, trigger, AnimationTriggerMetadata} from '@angular/animations';

const animationBody = [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues.
    state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
    state('enter', style({transform: 'none'})),
    transition('* => enter', animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({transform: 'none', opacity: 1}))),
    transition('* => void, * => exit', animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0})))
];

/**
 * Animations used by HcDialog.
 * @docs-private
 */
export const hcDialogAnimations: {
    readonly dialogContainer: AnimationTriggerMetadata;
    readonly slideDialog: AnimationTriggerMetadata;
} = {
    /** Animation that is applied on the dialog container by defalt. */
    dialogContainer: trigger('dialogContainer', animationBody),

    /** @deprecated @breaking-change 8.0.0 Use `hcDialogAnimations.dialogContainer` instead. */
    slideDialog: trigger('slideDialog', animationBody)
};
