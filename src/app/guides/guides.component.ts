import {Component, OnDestroy} from '@angular/core';
import {GuidesService, IGuide} from './guides.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-guides',
    templateUrl: './guides.component.html',
    styleUrls: ['../shared/base-demo.component.scss']
})
export class GuidesComponent implements OnDestroy {
    thisPage = '';
    queryTab = 0;

    private unsubscribe = new Subject<void>();
    private appInsights;

    constructor(public guidesService: GuidesService, private router: Router, private route: ActivatedRoute) {
        this.appInsights = new ApplicationInsightsService();
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                for (let entry of this.guidesService.guides) {
                    if (event.urlAfterRedirects === `/web/guides/${entry.route}`) {
                        this.thisPage = entry.title;
                        this.appInsights.logPageView(this.thisPage, event.urlAfterRedirects);
                        break;
                    }
                }
            }
        });

        //  Gets the search parameter value from the url
        this.route.queryParams.subscribe(() => {
            let currentPath = this.router.url;
            currentPath = currentPath.replace( '/web/guides/', '' );
            const pathArray = currentPath.split( '?' );

            for ( let i = 0; i < this.guidesService.guides.length; i++ ) {
                if ( pathArray[0] === this.guidesService.guides[i].route ) {
                    this.queryTab = i;
                    break;
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        for (let entry of this.guidesService.guides) {
            if (event === entry.title) {
                this.router.navigate(['/web/guides/' + entry.route]);
                window.scrollTo(0, 0);
                break;
            }
        }
    }

    // Handle nav changes via the sidebar
    navUpdate(page: any) {
        this.router.navigate(['/web/guides/' + page]);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
