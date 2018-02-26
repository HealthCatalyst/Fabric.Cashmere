import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SelectModule } from '../../../lib/src/select';

@Component({
    selector: 'hc-demo-styles',
    templateUrl: './styles.component.html'
})
export class StylesComponent {

    thisPage = 'Colors';

    constructor( private activatedRoute: ActivatedRoute, private router: Router ) {
        // Listen for vertical tab bar navigation and update the select component
        router.events.subscribe((event) => {
            if ( event instanceof NavigationEnd ) {
                if ( activatedRoute.firstChild ) {
                    this.thisPage = activatedRoute.firstChild.snapshot.data['title'];
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate ( event: any ) {
        let root = this.activatedRoute.routeConfig;
        if ( root && root.children ) {
            for ( let entry of root.children ) {
                if ( entry.data && event === entry.data.title ) {
                    this.router.navigate(['/styles/' + entry.path]);
                    break;
                }
            }
        }
    }
}
