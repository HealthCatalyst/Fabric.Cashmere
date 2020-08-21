import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import MiniSearch from 'minisearch';
const json = require('../../dist/user-guide/assets/docs/search/search.json');

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    navSearchBar = new FormControl('');

    searchResults;
    searchTest = json;

    miniSearch = new MiniSearch({
        fields: ['title', 'type'], // fields to index for full-text search
        storeFields: ['id', 'link', 'category', 'title'], // fields to return with search results
        searchOptions: {
            prefix: true,
            boost: { type: 20 }
        }
    });

    ngAfterViewInit() {
        this.miniSearch.addAll(this.searchTest);

        this.navSearchBar.valueChanges.subscribe((val) => {
            if (val !== '') {
                let tempResults = this.getItems(val);
                this.searchResults = tempResults.slice(0, 4);
                console.log(this.searchResults);
            } else {
                this.searchResults = [];
            }
        });
    }

    getItems = (value) => {
        let results = this.miniSearch.search(value);
        return results;
    }

    public showAll = () => {
        console.log("showing all");
    };

}



