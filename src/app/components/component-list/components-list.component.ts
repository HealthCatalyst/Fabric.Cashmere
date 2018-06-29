import {Component} from '@angular/core';
import {DocItem, DocumentItemsService} from '../../core/document-items.service';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components-list.component.html'
})
export class ComponentsListComponent {
    docItems: DocItem[];

    constructor(docItemService: DocumentItemsService) {
        this.docItems = docItemService.getDocItems();
    }
}
