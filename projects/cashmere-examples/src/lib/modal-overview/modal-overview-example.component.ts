import {HcModal, ModalOptions, ModalService} from '@healthcatalyst/cashmere';
import {Component, TemplateRef} from '@angular/core';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';

/**
 * @title Modal overview
 */
@Component({
    selector: 'hc-modal-overview-example',
    templateUrl: 'modal-overview-example.component.html'
})
export class ModalOverviewExampleComponent {
    result: any;

    constructor(private modalService: ModalService) {}

    open() {
        let options: ModalOptions = {
            data:
                'This is a size lg modal with isDraggable set to true. It places a drag handle in the top right corner which you can use to reposition the modal.',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg',
            isDraggable: true,
            isResizable: true
        };
        let subModal: HcModal<ModalOverviewExampleModalComponent> = this.modalService.open(ModalOverviewExampleModalComponent, options);
        subModal.result.subscribe(res => (this.result = res));
    }

    openTemplate(content: TemplateRef<any>) {
        let options: ModalOptions = {
            data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum nulla in consectetur tempus. Mauris quis turpis blandit, porta nulla in, sollicitudin libero. Sed pulvinar velit eget lacus euismod interdum. Proin vitae aliquam augue. Vestibulum fermentum turpis quis convallis vehicula. Nullam posuere facilisis rutrum. Nullam congue, arcu eget scelerisque viverra, orci nibh iaculis ante, a tincidunt elit arcu at tortor. Vestibulum in nulla turpis. Phasellus dapibus tellus urna, a fringilla orci rutrum ac. Integer lacinia, erat ac ultricies cursus, lacus velit pellentesque sem, at mollis magna nulla elementum justo. Nam sit amet viverra lorem. Cras sodales gravida mi nec eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc elementum quis turpis sit amet efficitur. Aenean id lectus at dolor feugiat finibus eu a est. Vivamus tortor mi, lacinia sit amet nulla pellentesque, tincidunt fringilla risus.',
            size: 'md',
            ignoreOverlayClick: true,
            isResizable: true
        };
        this.modalService.open(content, options);
    }
}
