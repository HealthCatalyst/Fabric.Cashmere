import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-sidenav-overview-example',
    templateUrl: 'sidenav-overview-example.component.html',
    styleUrls: ['sidenav-overview-example.component.scss']
})
export class SidenavOverviewExampleComponent {
    user: IUser = {
        name: 'John Doe',
        avatar: '/src/assets/avatar.jpg'
    };
}
