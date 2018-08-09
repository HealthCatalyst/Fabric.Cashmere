import {Component} from '@angular/core';
import {DocItem, DocumentItemsService} from '../core/document-items.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html'
})
export class ComponentsComponent {
    docItems: DocItem[];
    thisPage = '';
    selectOptions: Array<string> = [];

    constructor(docItemService: DocumentItemsService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.docItems = docItemService.getDocItems();

        // Listen for vertical tab bar navigation and update the select component
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (activatedRoute.firstChild) {
                    this.thisPage = activatedRoute.firstChild.snapshot.params['id'];
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        this.router.navigate(['/components/' + event]);
    }
}
