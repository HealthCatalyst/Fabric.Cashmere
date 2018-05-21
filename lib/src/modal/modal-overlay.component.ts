import {Component, HostListener, HostBinding, Input} from '@angular/core';
import {ActiveModal} from './active-modal';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
    selector: 'hc-modal-overlay',
    template: '',
    styles: [
        `:host{
                background-color: #000;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: .5;
                display: block;
            }`
    ],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 0.5})),
            transition('void <=> *', [
                style({
                    opacity: 0
                }),
                animate('0.2s ease-in-out')
            ])
        ])
    ]
})
export class ModalOverlayComponent {
    @Input() ignoreEscapeKey = false;

    constructor(private activeModal: ActiveModal) {}

    @HostBinding('@fadeInOut')
    fadeInOut() {
        return state;
    }

    @HostListener('document:keyup.escape', ['$event'])
    escapeKey(event: any) {
        if (!this.ignoreEscapeKey) {
            this.activeModal.close();
        }
    }
}
