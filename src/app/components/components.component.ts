import {Component} from '@angular/core';
import {DocItem, DocumentItemsService} from '../core/document-items.service';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html'
})
export class ComponentsComponent {
    docItems: DocItem[];

    constructor(docItemService: DocumentItemsService) {
        this.docItems = docItemService.getDocItems();
    }
}
