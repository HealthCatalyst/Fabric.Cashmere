import {Component} from '@angular/core';
import { SidenavLink, SidenavTabGroup } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav tab groups
 */
@Component({
    selector: 'hc-sidenav-tab-group-example',
    templateUrl: 'sidenav-tab-group-example.component.html',
    styleUrls: ['sidenav-tab-group-example.component.scss']
})
export class SidenavTabGroupExampleComponent {
    tabs: SidenavLink[] = [
        new SidenavLink({title: 'GitHub', iconClass: 'fa fa-github', description: 'Source code repositories'}),
        new SidenavLink({title: 'Stack Overflow', iconClass: 'fa fa-stack-overflow', description: 'Q&A site for developers'}),
        new SidenavLink({title: 'Trello', iconClass: 'fa fa-trello', description: 'Project management'}),
        new SidenavLink({title: 'JS Fiddle', iconClass: 'fa fa-jsfiddle', description: 'Online JavaScript editor'})
    ];

    tabGroups: SidenavTabGroup[] = [
        new SidenavTabGroup({ title: 'Browsers', iconClass: 'fa fa-laptop', description: 'Browser options', children: [
            new SidenavLink({title: 'Google Chrome', iconClass: 'fa fa-chrome', description: 'Our preferred browser'}),
            new SidenavLink({title: 'Firefox', iconClass: 'fa fa-firefox', description: 'A good alternative'}),
            new SidenavLink({title: 'Internet Explorer', iconClass: 'fa fa-internet-explorer', description: 'The best browser for downloading other browsers'}),
            new SidenavLink({title: 'Safari', iconClass: 'fa fa-safari', description: 'Mac users only'}),
            new SidenavLink({title: 'Edge', iconClass: 'fa fa-edge', description: 'The new IE'})
        ]})
    ];
}
