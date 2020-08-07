import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    navSearchBar = new FormControl('');

    searchResults;
    searchTest = [
        { id: 'button', title: 'Button Component', description: 'bleh', subContent: 'sub bleh'},
        { id: 'date picker', title: 'datepicker Component', description: 'bleh', subContent: 'sub bleh' },
        { id: 'date range', title: 'dateRange Component', description: 'bleh', subContent: 'sub bleh' },
        { id: 'date search', title: 'dateSearch Component', description: 'bleh', subContent: 'sub bleh' },
        { id: 'date test', title: 'dateTest Component', description: 'bleh', subContent: 'sub bleh' },
        { id: 'date test2', title: 'dateTest1 Component', description: 'bleh', subContent: 'sub bleh' },
        { id: 'date test3', title: 'dateTest2 Component', description: 'bleh', subContent: 'sub bleh' },
    ];

    ngAfterViewInit() {
        this.navSearchBar.valueChanges.subscribe((val) => {
            if (val !== '') {
                let tempResults = this.getItems(val);
                this.searchResults = tempResults.slice(0, 4);
            } else {
                this.searchResults = [];
            }
        });
    }

    getItems = (value) => {
        const userInput = value.trim().toLowerCase();
        return this.searchTest.filter(m => m.id.includes(userInput));
    }

    public showAll = () => {
        console.log("showing all");
    };

}



