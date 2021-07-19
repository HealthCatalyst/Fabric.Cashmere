import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-demo-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['../shared/base-demo.component.scss']
})
export class AnalyticsComponent implements OnDestroy {
    thisPage = '';
    activeCategory = '';
    queryTab = 0;
    selectOptions: Array<Data> = [];
    categories: Array<string> = [];
    private unsubscribe = new Subject<void>();
    private appInsights;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.appInsights = new ApplicationInsightsService();
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (activatedRoute.firstChild) {
                    this.thisPage = activatedRoute.firstChild.snapshot.data['category'] + ' - ' + activatedRoute.firstChild.snapshot.data['title'];
                    this.appInsights.logPageView(this.thisPage, event.urlAfterRedirects);
                    this.activeCategory = activatedRoute.firstChild.snapshot.data['category'];
                }
            }
        });

        // Populate the responsive select component with the router information
        const root = this.activatedRoute.routeConfig;
        if ( root && root.children ) {
            for (const entry of root.children ) {
                if (entry.data && entry.data.title) {
                    this.selectOptions.push(entry);
                    if ( entry.data.category && !this.categories.includes( entry.data.category )) {
                        this.categories.push( entry.data.category );
                    }
                }
            }
        }

        //  Gets the search parameter value from the url
        this.activatedRoute.queryParams.subscribe(() => {
            let currentPath = this.router.url;
            currentPath = currentPath.replace( '/analytics/', '' );
            const pathArray = currentPath.split( '?' );

            if (this.selectOptions.length) {
                for ( let i = 0; i < this.selectOptions.length; i++ ) {
                    if (pathArray[0] === this.selectOptions[i].path) {
                        this.queryTab = i;
                        break;
                    }
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: string): void {
        if (this.selectOptions.length) {
            for (const entry of this.selectOptions) {
                if (entry.data && event === entry.data.category + ' - ' + entry.data.title) {
                    this.router.navigate(['/analytics/' + entry.path]);
                    window.scrollTo(0, 0);
                    break;
                }
            }
        }
    }

    // Handle nav changes via the sidebar
    navUpdate(page: string): void {
        this.router.navigate(['/analytics/' + page]);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
