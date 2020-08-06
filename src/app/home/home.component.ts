import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('search', { static: false }) userInput: ElementRef;
    searchBar = new FormControl("");

    searchResults;
    searchTest = [
        { id: 'button', name: 'ButtonComponent' },
        { id: 'date picker', name: 'datepickerComponent' },
        { id: 'date range', name: 'dateRangeComponent' },
        { id: 'date search', name: 'dateSearchComponent' }
    ];

    constructor() { }

    ngAfterViewInit() {
        this.userInput.nativeElement.addEventListener('keyup', (event) => {
            if (event.key.length === 1) {
                this.searchResults = this.getItems();
                console.log(this.searchResults);
            }
        });
    }

    getItems = () => {
        const userInput = this.userInput.nativeElement.value.trim().toLowerCase();
        return this.searchTest.filter(m => m.id.includes(userInput));
    }
}
