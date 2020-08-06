import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit {
    searchBar = new FormControl("");
    @Input()
    result;
    @Input()
    highlight: string;
    pageNumberControl = new FormControl(8);
    pageSizeControl = new FormControl(100);
    totalItemsControl = new FormControl(1000);
    widthControl = new FormControl('lg');

    constructor() {

    }

    ngOnInit() { }
}