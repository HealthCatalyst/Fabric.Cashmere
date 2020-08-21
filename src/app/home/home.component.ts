import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import MiniSearch from 'minisearch';
const json = require('../../../dist/user-guide/assets/docs/search/search.json');

@Component({
    selector: 'hc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    searchBar = new FormControl("");

    searchResults;
    searchTest = json;

    miniSearch = new MiniSearch({
        fields: ['title', 'type'], // fields to index for full-text search
        storeFields: ['id', 'link', 'category'], // fields to return with search results
        searchOptions: {
            prefix: true,
            boost: { type: 20 }
        }
    });

    ngAfterViewInit() {
        this.miniSearch.addAll(this.searchTest);

        this.searchBar.valueChanges.subscribe((val) => {
            if (val.length > 2) {
                this.searchResults = this.getItems(val);
            }
        });
    }

    getItems = (value) => {
        let results = this.miniSearch.search(value);
        console.log(results);
        return results.slice(0, 3);
    }
}
