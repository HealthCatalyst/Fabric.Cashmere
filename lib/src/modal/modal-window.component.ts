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
         let modalContentNotPresent = true;
         let modalWindowTargetIncluded = event.path.findIndex(p => p === this.el.nativeElement) > -1;
         let classList: (DOMTokenList | undefined)[] = event.path.map(p => p.classList);
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
         if (!this.ignoreOverlayClick
             && modalContentNotPresent
             && modalWindowTargetIncluded) {
             this.activeModal.close();
         }
     }
}
