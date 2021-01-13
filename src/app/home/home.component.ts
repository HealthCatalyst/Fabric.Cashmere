import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'hc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    searchBar = new FormControl("");

    constructor(private router: Router) { }

    onEnter() {
        this.router.navigate(['/results'], { queryParams: { search: this.searchBar.value } });
    }
}
