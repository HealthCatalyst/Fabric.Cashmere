import { trigger, state, transition, style, animate } from '@angular/animations';
import { ModalSize } from './modal-options';
import { Component, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { ActiveModal } from './active-modal';

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
    @Input() ignoreOverlayClick = false;
    @Input() size: ModalSize = 'md';

    constructor(private activeModal: ActiveModal, private el: ElementRef) { }

    @HostBinding('@fadeInOut') fadeInOut() {
        return state;
     }

     @HostListener('click', ['$event'])
     overlayClick(event: any) {
         if (!this.ignoreOverlayClick && this.el.nativeElement === event.target) {
             this.activeModal.close();
         }
     }
}
