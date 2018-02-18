import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
    selector: 'hc-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.map(event => {
            if (event instanceof NavigationStart) {
                console.log(event.url);
            }

            if (event instanceof NavigationEnd) {
                console.log(event.url);
            }
        }).subscribe();
    }
}
