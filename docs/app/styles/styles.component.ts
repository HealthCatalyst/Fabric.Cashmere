import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SelectModule } from '../../../lib/src/select';

@Component({
    selector: 'hc-demo-styles',
    templateUrl: './styles.component.html'
})
export class StylesComponent {

    thisPage = 'Colors';

    constructor( private router: Router ) {
        // Listen for vertical tab bar navigation and update the select component
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if ( event.url === '/styles/color') {
                    this.thisPage = 'Colors';
                } else if ( event.url === '/styles/table') {
                    this.thisPage = 'Tables';
                } else if ( event.url === '/styles/typography') {
                    this.thisPage = 'Typography';
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate ( event: any ) {
        if ( event === 'Colors') {
            this.router.navigate(['/styles/color']);
        } else if ( event === 'Tables') {
            this.router.navigate(['/styles/table']);
        } else if ( event === 'Typography') {
            this.router.navigate(['/styles/typography']);
        }
    }

}
