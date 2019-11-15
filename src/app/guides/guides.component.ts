import {Component, OnInit, OnDestroy} from '@angular/core';
import {GuidesService} from './guides.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-guides',
    templateUrl: './guides.component.html',
    styleUrls: ['../components/components.component.scss']
})
export class GuidesComponent implements OnDestroy {
    thisPage = '';
    selectOptions: Array<string> = [];

    private unsubscribe = new Subject<void>();
    private appInsights;

    constructor(public guidesService: GuidesService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.appInsights = new ApplicationInsightsService();
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                for (let entry of this.guidesService.guides) {
                    if (event.url === `/guides/${entry.route}`) {
                        this.thisPage = entry.title;
                        this.appInsights.logPageView(this.thisPage, event.urlAfterRedirects);
                        break;
                    }
                }
            }
        });

        // Populate the responsive select component with the router information
        for (let entry of this.guidesService.guides) {
            this.selectOptions.push(entry.title);
        }
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        for (let entry of this.guidesService.guides) {
            if (event === entry.title) {
                this.router.navigate(['/guides/' + entry.route]);
                window.scrollTo(0, 0);
                break;
            }
        }
    }

    // Handle nav changes via the sidebar
    navUpdate(page: any) {
        this.router.navigate(['/guides/' + page]);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
