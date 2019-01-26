import {animate, state, style, transition, trigger} from '@angular/animations';
import {ModalSize} from './modal-options';
import {Component, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {ActiveModal} from './active-modal';

@Component({
    selector: 'hc-modal-window',
    template: `
        <div [class]="'hc-modal hc-modal-' + _size"><ng-content></ng-content></div>
    `,
    styleUrls: ['./modal-window.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 1})),
            transition('void <=> *', [
                style({
                    opacity: 0
                }),
                animate('0.2s ease-in-out')
            ])
        ])
    ]
})
export class ModalWindowComponent {
    @Input()
    _ignoreOverlayClick = false;
    @Input()
    _size: ModalSize = 'auto';

    constructor(private activeModal: ActiveModal, private el: ElementRef) {}

    @HostBinding('@fadeInOut')
    _fadeInOut() {
        return state;
    }

    @HostListener('click', ['$event'])
    _overlayClick(event: any) {
        let modalContentNotPresent = true;
        let path = this._eventPath(event);
        let modalWindowTargetIncluded = path.findIndex(p => p === this.el.nativeElement) > -1;
        let classList: (DOMTokenList | undefined)[] = path.map(p => p.classList);
        for (let cl of classList) {
            if (cl) {
                if (cl.contains('hc-modal-content')) {
                    modalContentNotPresent = false;
                }
            }
        }

        /* The hc-modal has 100% height (although not completely visible).
            To enable closing the modal while clicking above or below the modal (in
            addition to the sides) this function will check to see if the click
            event includes:
                1. This window element
                2. Not the hc-modal-content and
                3. the overlay click option is disabled. */
        if (!this._ignoreOverlayClick && modalContentNotPresent && modalWindowTargetIncluded) {
            this.activeModal.dismiss();
        }
    }

    // Serves as a polyfill for Event.composedPath() or Event.Path
    _eventPath(evt: any) {
        let path = (evt.composedPath && evt.composedPath()) || evt.path,
            target = evt.target;

        if (path != null) {
            // Safari doesn't include Window, but it should.
            return path.indexOf(window) < 0 ? path.concat(window) : path;
        }

        if (target === window) {
            return [window];
        }

        function _getParents(node, memo?) {
            memo = memo || [];
            let parentNode = node.parentNode;

            if (!parentNode) {
                return memo;
            } else {
                return _getParents(parentNode, memo.concat(parentNode));
            }
        }

        return [target].concat(_getParents(target), window);
    }
}
