import {Component, OnDestroy, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, Params, PRIMARY_OUTLET, Router} from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * IBreadcrumb interface is used to store all required data for each breadcrumb element
 * @docs-private
 */
export interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
}

/*
  This type is from @angular/router, but the import location varies by Angular version
  Including here to allow Cashmere to work regardless of Angular version
*/
export type QueryParamsHandling = 'merge' | 'preserve' | '';

/** A navigational aid that allows users to keep track of their location within the current application  */
@Component({
    selector: 'hc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    public _breadcrumbs: IBreadcrumb[] = [];
    public _routerSubscription: Subscription;
    _backURL = '';
    _backShow = 'none';
    _locationLabel = '';
    _queryParamsHandling: QueryParamsHandling = '';

    /** Sets the handling of the query parameters for the breadcrumb. Choose from: `'preserve' | 'merge' | '' (default)` */
    @Input()
    get queryParamsHandling(): QueryParamsHandling {
        return this._queryParamsHandling;
    }

    set queryParamsHandling(queryParamsHandling: QueryParamsHandling) {
        this._queryParamsHandling = queryParamsHandling;
    }

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        // Add the first breadcrumb for the base page
        const root: ActivatedRoute = this.activatedRoute.root;
        this._breadcrumbs = this.getBreadcrumbs(root);

        // subscribe to the NavigationEnd event
        this._routerSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.setBreadcrumbs();
            }
        });

        // set initial breadcrumb state
        this.setBreadcrumbs();
    }

    private setBreadcrumbs() {
        const root = this.activatedRoute.root;
        this._breadcrumbs = this.getBreadcrumbs(root);
        if (this._breadcrumbs.length > 1) {
            this._backURL = this._breadcrumbs[this._breadcrumbs.length - 2].url;
            this._backShow = 'inline';
            this._locationLabel = '';
        } else if (this._breadcrumbs.length === 1) {
            this._backShow = 'none';
            this._locationLabel = this._breadcrumbs[this._breadcrumbs.length - 1].label;
        } else {
            this._backShow = 'none';
            this._locationLabel = '';
        }
    }

    private getBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

        // get the child routes
        const children: ActivatedRoute[] = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        // iterate over each children
        for (const child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            // eslint-disable-next-line no-prototype-builtins
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get the route's URL segment
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            // append route URL to URL
            url += `/${routeURL}`;

            // add breadcrumb
            const parent: ActivatedRoute | null = this.activatedRoute.parent;
            let fullURL = '';
            if (parent !== null) {
                fullURL += '/' + parent.snapshot.url.map(segment => segment.path).join('/');
            }
            fullURL += `${url}`;
            const breadcrumb: IBreadcrumb = {
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
        this._routerSubscription.unsubscribe();
    }
}
