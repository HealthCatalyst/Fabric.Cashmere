import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-sidenav-overview-example',
    templateUrl: 'sidenav-overview-example.component.html',
    styleUrls: ['sidenav-overview-example.component.scss']
})
export class SidenavOverviewExampleComponent {
    user: IUser = {
        name: 'Jared Draper',
        avatar: 'https://tinyurl.com/y3pt56qb'
    };
}
