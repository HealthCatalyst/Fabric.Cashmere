import {Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'hc-backdrop',
    template: '',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .hc-backdrop {
                background-color: #000;
                position: absolute;
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
export class BackdropComponent {
    @Input()
    _ignoreEscapeKey = false;

    @Output() onClose = new EventEmitter<void>();

    @HostBinding('class.hc-backdrop') _hostClass = true;
    @HostBinding('style.z-index') zIndex = 940;

    @HostBinding('@fadeInOut')
    _fadeInOut(): string | unknown {
        return state;
    }

    @HostListener('click')
    _onClick() {
        this.onClose.emit();
    }

    @HostListener('document:keyup.escape')
    _escapeKey(): void {
        if (!this._ignoreEscapeKey) {
            this.onClose.emit();
        }
    }
}
