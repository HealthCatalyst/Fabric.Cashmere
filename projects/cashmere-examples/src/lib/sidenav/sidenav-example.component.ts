import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavLink, SidenavLinkClickEvent } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav
 */
@Component({
    selector: 'hc-sidenav-example',
    templateUrl: 'sidenav-example.component.html',
    styleUrls: ['sidenav-example.component.scss']
})
export class SidenavExampleComponent {
    isLoadingTabs: FormControl = new FormControl(false);
    isLoadingFavs: FormControl = new FormControl(false);
    collapsed = false;
    eventsLog: string[] = [];
    tabs: SidenavLink[] = [
        new SidenavLink({title: 'Home', iconClass: 'fa fa-home', description: 'User\'s home dashboard'}),
        new SidenavLink({title: 'Land', iconClass: 'fa fa-car', description: 'Travel by land', subText: "$"}),
        new SidenavLink({title: 'Sky', iconClass: 'fa fa-plane', description: 'Travel by sky', subText: "$$"}),
        new SidenavLink({title: 'Sea', iconClass: 'fa fa-ship', description: 'Travel by sea', subText: "$"}),
        new SidenavLink({title: 'Space', iconClass: 'fa fa-rocket', description: 'Travel amongst the stars', subText: "$$$"}),
    ]
    favs: SidenavLink[] = [
        new SidenavLink({title: 'Toyota Tacoma', iconClass: 'fa fa-car fav-travel-ico fav-ico-teal', description: 'Solid mid-size pickup'}),
        new SidenavLink({title: 'Land Rover', iconClass: 'fa fa-car fav-travel-ico fav-ico-green', description: 'Travel in style'}),
        new SidenavLink({title: 'S.S. TugsAlot', iconClass: 'fa fa-ship fav-travel-ico fav-ico-teal', description: 'Tugboat'}),
        new SidenavLink({title: 'Boeing 737', iconClass: 'fa fa-plane fav-travel-ico fav-ico-blue', description: 'Fly the friendly skies'}),
        new SidenavLink({title: 'Falcon Heavy', iconClass: 'fa fa-rocket fav-travel-ico fav-ico-blue', description: 'Fly me to the moon'}),
    ]

    onTabClick(event: SidenavLinkClickEvent): void {
        this.eventsLog.push(`Tab "${event.link.title}" clicked`);
    }

    onFavClick(event: SidenavLinkClickEvent): void {
        this.eventsLog.push(`Favorite "${event.link.title}" clicked`);
    }

    unfavorite(event: SidenavLinkClickEvent): void {
        this.eventsLog.push(`Favorite "${event.link.title}" action icon clicked`);
        this.favs = this.favs.filter(fav => fav.key !== event.link.key);
    }
}
