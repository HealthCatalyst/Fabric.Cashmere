import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationInsightsService } from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
    searchBar = new FormControl("", {nonNullable: true});

    constructor(private router: Router, private appInsights: ApplicationInsightsService) { }

    onEnter(): void {
        this.appInsights.logSiteSearch( this.searchBar.value );
        this.router.navigate(['/results'], { queryParams: { search: this.searchBar.value } });
    }
}
