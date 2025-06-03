import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavLink, SidenavLinkClickEvent } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav
 */
@Component({
    selector: 'hc-sidenav-example',
    templateUrl: 'sidenav-example.component.html',
    styleUrls: ['sidenav-example.component.scss'],
    standalone: false
})
export class SidenavExampleComponent {
    isLoadingTabs: FormControl = new FormControl(false);
    isLoadingFavs: FormControl = new FormControl(false);
    isDarkMode: FormControl = new FormControl(false);
    width: FormControl = new FormControl('260px');
    collapsed = false;
    eventsLog: string[] = [];
    tabs: SidenavLink[] = [
        new SidenavLink({title: 'Home', iconClass: 'fa-solid fa-house', description: 'User\'s home dashboard', badgeHTML: '<span title="I am number 4">4</span>', badgeColor: 'slate-gray-300'}),
        new SidenavLink({title: 'Land', iconClass: 'fa-solid fa-car', description: 'Travel by land', subText: "$"}),
        new SidenavLink({title: 'Sky', iconClass: 'fa-solid fa-plane', description: 'Travel by sky', subText: "$$"}),
        new SidenavLink({title: 'Sea', iconClass: 'fa-solid fa-ship', description: 'Travel by sea', subText: "$"}),
        new SidenavLink({title: 'Space', labelHTML: '<em>Space</em>', iconClass: 'fa-solid fa-rocket', description: 'Travel amongst the stars', subText: "$$$"}),
    ]
    favs: SidenavLink[] = [
        new SidenavLink({title: 'Toyota Tacoma', iconClass: 'fa-solid fa-car fav-travel-ico fav-ico-teal', description: 'Solid mid-size pickup'}),
        new SidenavLink({title: 'Land Rover', iconClass: 'fa-solid fa-car fav-travel-ico fav-ico-green', description: 'Travel in style'}),
        new SidenavLink({title: 'S.S. TugsAlot', iconClass: 'fa-solid fa-ship fav-travel-ico fav-ico-teal', description: 'Tugboat'}),
        new SidenavLink({title: 'Boeing 737', iconClass: 'fa-solid fa-plane fav-travel-ico fav-ico-blue', description: 'Fly the friendly skies'}),
        new SidenavLink({title: 'Falcon Heavy', iconClass: 'fa-solid fa-rocket fav-travel-ico fav-ico-blue', description: 'Fly me to the moon'}),
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
