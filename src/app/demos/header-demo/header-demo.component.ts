import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-header-demo',
    templateUrl: 'header-demo.component.html',
    styleUrls: ['header-demo.component.scss']
})
export class HeaderDemoComponent {
    mobileView = false;
    user: IUser = {
        name: 'John Doe',
        avatar: '/src/assets/avatar.jpg'
    };
}
