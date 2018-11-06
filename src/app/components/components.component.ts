import {Component, OnDestroy} from '@angular/core';
import {DocItem, DocumentItemsService} from '../core/document-items.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html'
})
export class ComponentsComponent implements OnDestroy {
    docItems: DocItem[];
    thisPage = '';
    selectOptions: Array<string> = [];
    private unsubscribe = new Subject<void>();

    constructor(docItemService: DocumentItemsService, activatedRoute: ActivatedRoute, private router: Router) {
        this.docItems = docItemService.getDocItems();

        // Listen for vertical tab bar navigation and update the select component
        router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
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

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
