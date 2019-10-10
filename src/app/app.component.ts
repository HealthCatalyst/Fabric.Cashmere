import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    demoMode = false;
    @HostBinding('class.demo-mode') get isDemoMode() {
        return this.demoMode;
    }
    constructor(public route: ActivatedRoute, private router: Router) {
        router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                this.demoMode = event.url.includes('demo');
            }
        });
    }

    ngOnInit(): void {}

}
