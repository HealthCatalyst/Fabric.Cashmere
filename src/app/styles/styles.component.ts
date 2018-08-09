import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'hc-demo-styles',
    templateUrl: './styles.component.html'
})
export class StylesComponent implements OnDestroy {
    thisPage = '';
    selectOptions: Array<string> = [];
    private unsubscribe = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (activatedRoute.firstChild) {
                    this.thisPage = activatedRoute.firstChild.snapshot.data['title'];
                }
            }
        });

        // Populate the responsive select component with the router information
        let root = this.activatedRoute.routeConfig;
        if (root && root.children) {
            for (let entry of root.children) {
                if (entry.data && entry.data.title) {
                    this.selectOptions.push(entry.data.title);
                }
            }
        }
        this.selectOptions.sort();
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        let root = this.activatedRoute.routeConfig;
        if (root && root.children) {
            for (let entry of root.children) {
                if (entry.data && event === entry.data.title) {
                    this.router.navigate(['/styles/' + entry.path]);
                    break;
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
