/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

/** @docs-private */
export function createMissingDateImplError(provider: string) {
    return Error(
        `Datepicker: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: HcNativeDateModule, MatMomentDateModule, or provide a ` +
            `custom implementation.`
    );
}
