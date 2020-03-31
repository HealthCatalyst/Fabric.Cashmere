import {Injectable, OnDestroy} from '@angular/core';
export enum KEY_CODE {
    DOWN_ARROW = 40,
    RIGHT_ARROW = 39,
    UP_ARROW = 38,
    LEFT_ARROW = 37,
    TAB = 9
}

export interface HcPopKeyboardNotifier {
    isOpen: boolean;
    nativeElement: HTMLElement;
    hasSubmenu: () => boolean;
    onKeyDown: (event: KeyboardEvent) => void;
}

@Injectable()
export class HcPopoverAccessibilityService implements OnDestroy {
    private notifiers: HcPopKeyboardNotifier[] = [];

    constructor() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    ngOnDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    registerNotifier(notifier: HcPopKeyboardNotifier) {
        this.notifiers.push(notifier);
    }

    private handleKeydown = (event: KeyboardEvent) => {
        this.notifiers.filter(n => n.isOpen).forEach(n => n.onKeyDown(event));
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.notifiers.filter(n => document.activeElement === n.nativeElement && n.hasSubmenu()).forEach(n => n.onKeyDown(event));
        }
    };
}
