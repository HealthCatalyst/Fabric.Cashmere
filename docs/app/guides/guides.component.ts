import {Component, OnInit} from '@angular/core';
import {GuidesService} from './guides.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';

@Component({
    selector: 'hc-guides',
    templateUrl: './guides.component.html'
})
export class GuidesComponent implements OnInit {
    thisPage = '';
    selectOptions: Array<string> = [];

    constructor(public guidesService: GuidesService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                for (let entry of this.guidesService.guides) {
                    if (event.url === `/guides/${entry.route}`) {
                        this.thisPage = entry.title;
                        break;
                    }
                }
            }
        });

        // Populate the responsive select component with the router information
        for (let entry of this.guidesService.guides) {
            this.selectOptions.push(entry.title);
        }
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        for (let entry of this.guidesService.guides) {
            if (event === entry.title) {
                this.router.navigate(['/guides/' + entry.route]);
                break;
            }
        }
    }
}
