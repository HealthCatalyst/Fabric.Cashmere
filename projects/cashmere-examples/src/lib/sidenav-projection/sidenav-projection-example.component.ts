import {Component} from '@angular/core';
import { SidenavLink } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav w/ Content Projection
 */
@Component({
    selector: 'hc-sidenav-projection-example',
    templateUrl: 'sidenav-projection-example.component.html',
    styleUrls: ['sidenav-projection-example.component.scss']
})
export class SidenavProjectionExampleComponent {
    tabs: SidenavLink[] = [
        new SidenavLink({title: 'Sunny', iconClass: 'fa fa-sun-o', description: 'Sunny with a high of 75'}),
        new SidenavLink({title: 'Cloudy', iconClass: 'fa fa-cloud', description: 'Clouds clouds clouds'}),
        new SidenavLink({title: 'Stormy', iconClass: 'fa fa-bolt', description: 'Thunder & Lightning'}),
        new SidenavLink({title: 'Snowy', iconClass: 'fa fa-snowflake-o', description: 'Let it snow'})
    ]
}
