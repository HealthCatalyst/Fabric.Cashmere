import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html'
})
export class ComponentsComponent {

    thisPage = 'Accordion';

    constructor( private router: Router ) {
        // Listen for vertical tab bar navigation and update the select component
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if ( event.url === '/components/accordion') {
                    this.thisPage = 'Accordion';
                } else if ( event.url === '/components/breadcrumbs') {
                    this.thisPage = 'Breadcrumbs';
                } else if ( event.url === '/components/button') {
                    this.thisPage = 'Button';
                } else if ( event.url === '/components/checkbox') {
                    this.thisPage = 'Checkbox';
                } else if ( event.url === '/components/chip') {
                    this.thisPage = 'Chips';
                } else if ( event.url === '/components/drawer') {
                    this.thisPage = 'Drawer';
                } else if ( event.url === '/components/icon') {
                    this.thisPage = 'Icon';
                } else if ( event.url === '/components/list') {
                    this.thisPage = 'List';
                } else if ( event.url === '/components/navbar') {
                    this.thisPage = 'Navbar';
                } else if ( event.url === '/components/popover') {
                    this.thisPage = 'Popover';
                } else if ( event.url === '/components/radio-button') {
                    this.thisPage = 'Radio Button';
                } else if ( event.url === '/components/select') {
                    this.thisPage = 'Select';
                } else if ( event.url === '/components/subnav') {
                    this.thisPage = 'Subnavbar';
                } else if ( event.url === '/components/tabs') {
                    this.thisPage = 'Tabs';
                } else if ( event.url === '/components/tile') {
                    this.thisPage = 'Tile';
                }
            }
        });
    }

    // Handle changes to the select component and navigate
    selectUpdate ( event: any ) {
        if ( event === 'Accordion') {
            this.router.navigate(['/components/accordion']);
        } else if ( event === 'Breadcrumbs') {
            this.router.navigate(['/components/breadcrumbs']);
        } else if ( event === 'Button') {
            this.router.navigate(['/components/button']);
        } else if ( event === 'Checkbox') {
            this.router.navigate(['/components/checkbox']);
        } else if ( event === 'Chips') {
            this.router.navigate(['/components/chip']);
        } else if ( event === 'Drawer') {
            this.router.navigate(['/components/drawer']);
        } else if ( event === 'Icon') {
            this.router.navigate(['/components/icon']);
        } else if ( event === 'List') {
            this.router.navigate(['/components/list']);
        } else if ( event === 'Navbar') {
            this.router.navigate(['/components/navbar']);
        } else if ( event === 'Popover') {
            this.router.navigate(['/components/popover']);
        } else if ( event === 'Radio Button') {
            this.router.navigate(['/components/radio-button']);
        } else if ( event === 'Select') {
            this.router.navigate(['/components/select']);
        } else if ( event === 'Subnavbar') {
            this.router.navigate(['/components/subnav']);
        } else if ( event === 'Tabs') {
            this.router.navigate(['/components/tabs']);
        } else if ( event === 'Tile') {
            this.router.navigate(['/components/tile']);
        }
    }
}
