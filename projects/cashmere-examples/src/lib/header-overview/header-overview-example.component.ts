import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';


@Component({
    selector: 'hc-header-overview-example',
    templateUrl: 'header-overview-example.component.html',
    styleUrls: ['header-overview-example.component.scss']
})
export class HeaderOverviewExampleComponent {
    user: IUser = {
        name: 'John Doe',
        avatar: '/src/assets/avatar.jpg'
    };
}
