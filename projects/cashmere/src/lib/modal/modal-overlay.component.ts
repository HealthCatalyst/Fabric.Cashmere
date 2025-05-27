import {Component, HostBinding, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {ActiveModal} from './active-modal';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'hc-modal-overlay',
    template: '',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .hc-modal-overlay {
                background-color: #000;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.5;
                display: block;
            }
        `
    ],
    animations: [
        trigger('fadeInOut', [
            state('in', style({ opacity: 0.5 })),
            transition('void <=> *', [
                style({
                    opacity: 0
                }),
                animate('0.2s ease-in-out')
            ])
        ])
    ],
    standalone: false
})
export class ModalOverlayComponent {
    @Input()
    _ignoreEscapeKey = false;

    @HostBinding('class.hc-modal-overlay') _hostClass = true;

    constructor(private activeModal: ActiveModal) {}

    @HostBinding('@fadeInOut')
    _fadeInOut(): string | unknown {
        return state;
    }

    @HostListener('document:keyup.escape')
    _escapeKey(): void {
        if (!this._ignoreEscapeKey) {
            this.activeModal.dismiss();
        }
    }
}
