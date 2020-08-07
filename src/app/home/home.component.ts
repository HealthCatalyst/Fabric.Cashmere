import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    searchBar = new FormControl("");

    searchResults;
    searchTest = [
        { id: 'button', name: 'ButtonComponent' },
        { id: 'date picker', name: 'datepickerComponent' },
        { id: 'date range', name: 'dateRangeComponent' },
        { id: 'date search', name: 'dateSearchComponent' }
    ];

    ngAfterViewInit() {
        this.searchBar.valueChanges.subscribe((val) => {
            this.searchResults = this.getItems(val);
        });
    }

    getItems = (value) => {
        const userInput = value.trim().toLowerCase();
        return this.searchTest.filter(m => m.id.includes(userInput));
    }
}
