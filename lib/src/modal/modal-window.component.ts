import { trigger, state, transition, style, animate } from '@angular/animations';
import { ModalSize } from './modal-options';
import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'hc-modal-window',
    template: `<div [class]="'hc-modal hc-modal-' + size">
                     <ng-content></ng-content>
               </div>`,
    styleUrls: ['./modal-window.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({ opacity: 1 })),
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
    @Input() size: ModalSize = 'md';
    @HostBinding('@fadeInOut') fadeInOut() {
        return state;
     }
}
