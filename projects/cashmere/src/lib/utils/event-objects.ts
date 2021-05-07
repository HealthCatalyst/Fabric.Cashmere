/**
 * @license
 * Copyright Health Catalyst All Rights Reserved.
 *
 * Use of this source code is governed by an Apache-2.0 license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/HealthCatalyst/Fabric.Cashmere/dev/LICENSE
 */

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x = 0, y = 0, button = 0) {
    const event = document.createEvent('MouseEvent');

    event.initMouseEvent(
        type,
        true /* canBubble */,
        false /* cancelable */,
        window /* view */,
        0 /* detail */,
        x /* screenX */,
        y /* screenY */,
        x /* clientX */,
        y /* clientY */,
        false /* ctrlKey */,
        false /* altKey */,
        false /* shiftKey */,
        false /* metaKey */,
        button /* button */,
        null /* relatedTarget */
    );

    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', {get: () => 1});

    return event;
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(type: string, canBubble = false, cancelable = true) {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
