import {Component, OnDestroy} from '@angular/core';
import {DocItem, DocumentItemsService} from '../core/document-items.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnDestroy {
    docItems: DocItem[];
    thisPage = '';
    thisCategory = '';
    selectOptions: Array<string> = [];
    private unsubscribe = new Subject<void>();
    private appInsights;

    constructor(docItemService: DocumentItemsService, activatedRoute: ActivatedRoute, private router: Router) {
        this.appInsights = new ApplicationInsightsService();
        this.docItems = docItemService.getDocItems();

        // Listen for vertical tab bar navigation and update the select component
        router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (activatedRoute.firstChild) {
                    this.thisPage = activatedRoute.firstChild.snapshot.params['id'];
                    this.docItems.forEach(element => {
                        if (this.thisPage === element.id) {
                            this.appInsights.logPageView(element.name, event.urlAfterRedirects);
                            this.thisCategory = element.category;
                        }
                    });
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        this.router.navigate(['/components/' + event]);
        window.scrollTo(0, 0);
    }

    // Handle nav changes via the sidebar
    navUpdate(id: any) {
        this.router.navigate(['/components/' + id]);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
