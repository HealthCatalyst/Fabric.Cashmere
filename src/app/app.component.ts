import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import MiniSearch from 'minisearch';
import json = require('../../dist/user-guide/assets/docs/search/search.json');
import basicJson = require('../../dist/user-guide/assets/docs/search/basic-search.json');

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    // @ViewChild('search', {static: true}) search: ;
    navSearchBar = new FormControl('');

    searchResults;
    searchTest = basicJson;

    miniSearch = new MiniSearch({
        fields: ['title', 'type'], // fields to index for full-text search
        storeFields: ['id', 'title', 'link', 'category', 'name', 'type'], // fields to return with search results
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
            } else {
                this.searchResults = [];
            }
        });
        // this.search
    }

    getItems = (value: string) => {
        let results = this.miniSearch.search(value);
        return results;
    }

    public showAll = () => {
        console.log("showing all");
    };

}



