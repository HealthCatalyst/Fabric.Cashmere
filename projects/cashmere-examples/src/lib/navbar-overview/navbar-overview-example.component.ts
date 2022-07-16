import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '@healthcatalyst/cashmere';

/**
 * @title Navbar overview
 */
@Component({
    selector: 'hc-navbar-overview-example',
    templateUrl: 'navbar-overview-example.component.html'
})
export class NavbarOverviewExampleComponent implements AfterViewInit {
    username = 'Christine K.';
    organization = 'Millrock Hospital';

    @ViewChild('exampleNavbar')
    exampleNavbar: NavbarComponent;

    ngAfterViewInit(): void {
        /**  This call usually isn't necessary if your navbar is visible on page load.
         * It's useful if your navbar appears after app load (like in this example)
         * to ensure that the widths are correctly calculated for collapsing items into the More menu. */
        setTimeout(() => {
            this.exampleNavbar.refreshNavLinks();
        }, 50);
    }
}
