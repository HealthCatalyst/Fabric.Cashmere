import {HcModal, ModalOptions, ModalService} from '@healthcatalyst/cashmere';
import {Component, TemplateRef} from '@angular/core';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';

/**
 * @title Modal overview
 */
@Component({
    selector: 'hc-modal-overview-example',
    templateUrl: 'modal-overview-example.component.html',
    standalone: false
})
export class ModalOverviewExampleComponent {
    result: unknown;

    constructor(private modalService: ModalService) {}

    openStandard(): void {
        const options: ModalOptions = {
            data: {
                content: 'This is a size lg modal. If isDraggable is set to true, it places a drag handle in the top right corner which you can use to reposition the modal. If isResizable is set to true, a resize handle appears in the bottom right to change the dimensions of the modal. They may be used together or separately.',
                isTightExample: false
            },
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        const subModal: HcModal<ModalOverviewExampleModalComponent> = this.modalService.open(ModalOverviewExampleModalComponent, options);
        subModal.result.subscribe(res => (this.result = res));
    }

    openTight():void {
        const options: ModalOptions = {
            data: {
                content: 'If tight is set to true, padding on the header, footer, and body will be set to 15px.',
                isTightExample: true
            },
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'sm',
            tight: true
        };
        this.modalService.open(ModalOverviewExampleModalComponent, options);
    }

    openTemplate(content: TemplateRef<unknown>): void {
        const options: ModalOptions = {
            data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum nulla in consectetur tempus. Mauris quis turpis blandit, porta nulla in, sollicitudin libero. Sed pulvinar velit eget lacus euismod interdum. Proin vitae aliquam augue. Vestibulum fermentum turpis quis convallis vehicula. Nullam posuere facilisis rutrum. Nullam congue, arcu eget scelerisque viverra, orci nibh iaculis ante, a tincidunt elit arcu at tortor. Vestibulum in nulla turpis. Phasellus dapibus tellus urna, a fringilla orci rutrum ac. Integer lacinia, erat ac ultricies cursus, lacus velit pellentesque sem, at mollis magna nulla elementum justo. Nam sit amet viverra lorem. Cras sodales gravida mi nec eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc elementum quis turpis sit amet efficitur. Aenean id lectus at dolor feugiat finibus eu a est. Vivamus tortor mi, lacinia sit amet nulla pellentesque, tincidunt fringilla risus.',
            size: 'md',
            ignoreOverlayClick: true,
            isDraggable: true,
            isResizable: true
        };
        this.modalService.open(content, options);
    }

    openViewer(content: TemplateRef<unknown>): void {
        const options: ModalOptions = {
            size: 'lg',
            closeIcon: true
        };
        this.modalService.open(content, options);
    }
}
