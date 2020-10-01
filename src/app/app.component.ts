import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import MiniSearch from 'minisearch';
import json = require('../../dist/search/search.json');
import { HcPopComponent } from 'projects/cashmere/src/lib/pop/popover.component';

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    @ViewChild('search', { static: false }) search: HcPopComponent;
    @ViewChild('searchInput', { static: false }) input: any;

    navSearchBar = new FormControl('');

    searchResults;
    searchTest = json;
    showAll = false;
    searchValue = '';
    searchIcons = {
        'components': { icon: 'fa-file-code-o' },
        'guides': { icon: 'fa-file-text-o' },
        'styles': { icon: 'fa-file-image-o' },
        'bits': { icon: 'fa-puzzle-piece' }
    };

    miniSearch = new MiniSearch({
        fields: ['title', 'content'], // fields to index for full-text search
        storeFields: ['id', 'title', 'link', 'category', 'name', 'type', 'content'], // fields to return with search results
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
            if (val.length !== 0) {
                this.showAll = true;
                this.searchValue = val;
            } else {
                this.showAll = false;
            }
        });
        // this.search
    }

    getItems = (value: string) => {
        let results = this.miniSearch.search(value);
        return results;
    }

    setInputFocus() {
        this.input.nativeElement.focus();
    }
}



