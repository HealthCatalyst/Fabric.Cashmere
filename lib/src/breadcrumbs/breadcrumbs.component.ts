import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
}

@Component({
    selector: 'hc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

    public breadcrumbs: IBreadcrumb[] = [];
    public routerSubscription: any;
    backURL: string = '';
    backShow: string = 'none';
    locationLabel: string = '';

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
        // Add the first breadcrumb for the base page
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);

        // subscribe to the NavigationEnd event
        this.routerSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // set breadcrumbs
                root = this.activatedRoute.root;
                this.breadcrumbs = this.getBreadcrumbs(root);
                if (this.breadcrumbs.length > 1) {
                    this.backURL = this.breadcrumbs[this.breadcrumbs.length - 2].url;
                    this.backShow = 'inline';
                    this.locationLabel = '';
                } else {
                    this.backShow = 'none';
                    this.locationLabel = this.breadcrumbs[this.breadcrumbs.length - 1].label;
                }
            }
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

        // get the child routes
        let children: ActivatedRoute[] = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        // iterate over each children
        for (let child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            // append route URL to URL
            url += `/${routeURL}`;

            // add breadcrumb
            let parent: ActivatedRoute | null = this.activatedRoute.parent;
            let fullURL: string = '';
            if (parent !== null) {
                fullURL += '/' + parent.snapshot.url.map(segment => segment.path).join('/');
            }
            fullURL += `${url}`;
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: fullURL
            };

            breadcrumbs.push(breadcrumb);

            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }

        // we should never get here, but just in case
        return breadcrumbs;
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
