import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavLink, SidenavTabGroup } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav tab groups
 */
@Component({
    selector: 'hc-sidenav-tab-group-example',
    templateUrl: 'sidenav-tab-group-example.component.html',
    styleUrls: ['sidenav-tab-group-example.component.scss'],
    standalone: false
})
export class SidenavTabGroupExampleComponent {
    hideChildrenOnCollapse: FormControl = new FormControl(true);

    constructor() {
        this.hideChildrenOnCollapse.valueChanges.subscribe(() => this.toggleGroupCollapse());
    }

    tabs: SidenavLink[] = [
        new SidenavLink({title: 'GitHub', iconClass: 'fa-brands fa-github', description: 'Source code repositories'}),
        new SidenavLink({title: 'Stack Overflow', iconClass: 'fa-brands fa-stack-overflow', description: 'Q&A site for developers'}),
        new SidenavLink({title: 'Trello', iconClass: 'fa-brands fa-trello', description: 'Project management'}),
        new SidenavLink({title: 'JS Fiddle', iconClass: 'fa-brands fa-jsfiddle', description: 'Online JavaScript editor'})
    ];

    tabGroups: SidenavTabGroup[] = [
        new SidenavTabGroup({ title: 'Browsers', iconClass: 'fa-solid fa-laptop', description: 'Browser options', children: [
            new SidenavLink({title: 'Google Chrome', iconClass: 'fa-brands fa-chrome', description: 'Our preferred browser'}),
            new SidenavLink({title: 'Firefox', iconClass: 'fa-brands fa-firefox', description: 'A good alternative'}),
            new SidenavLink({title: 'Internet Explorer', iconClass: 'fa-brands fa-internet-explorer', description: 'The best browser for downloading other browsers'}),
            new SidenavLink({title: 'Safari', iconClass: 'fa-brands fa-safari', description: 'Mac users only'}),
            new SidenavLink({title: 'Edge', iconClass: 'fa-brands fa-edge', description: 'The new IE'})
        ]})
    ];

    toggleGroupCollapse() {
        this.tabGroups.forEach(group => {
            group.hideChildrenOnCollapse = this.hideChildrenOnCollapse.value;
        });
    }
}
