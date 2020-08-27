import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as searchJson from '../../../dist/user-guide/assets/docs/search/search.json';
import { PaginationComponent, HcTableDataSource } from '@healthcatalyst/cashmere';
import { ActivatedRoute } from '@angular/router';
import MiniSearch from 'minisearch';

@Component({
    selector: 'hc-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements AfterViewInit, OnInit {

    constructor(private route: ActivatedRoute) { }

    searchBar: FormControl = new FormControl("");
    searchResultsData;
    searchDisplay;
    length;
    categories = new FormGroup({
        styles: new FormControl(true),
        components: new FormControl(true),
        guides: new FormControl(true),
        bits: new FormControl(true)
    });

    types = new FormGroup({
        html: new FormControl(true),
        Guides: new FormControl(true),
        ts: new FormControl(true),
        module: new FormControl(true)
    });

    // Functions to get the current page
    pageNumberControl = new FormControl(1);

    miniSearch = new MiniSearch({
        fields: ['title', 'type'],
        storeFields: ['title', 'content', 'link', 'category', 'type'],
        searchOptions: {
            prefix: true,
            boost: { type: 20 }
        }
    });

    ngAfterViewInit() {
        this.route.queryParams.subscribe(params => {
            console.log(this.searchBar.setValue(params['search']));
        });

    }

    displayResults(filterValues, typeFilterValues) {
        if (this.searchBar.value !== '') {
            let res = this.miniSearch.search(this.searchBar.value, {
                filter: (result) => {
                    let isMatching = false;

                    filterValues.forEach(element => {
                        if (result.category === element) {
                            isMatching = true;
                        }
                    });

                    typeFilterValues.forEach(element => {
                        if (result.type === element) {
                            isMatching = true;
                        }
                    });

                    return isMatching;
                }
            });
            console.log(res);
            this.length = res.length;
            this.searchResultsData = res;
            console.log(this.searchResultsData);
            this.searchDisplay = this.searchResultsData.slice(0, 5);
        } else {
            this.searchResultsData = [];
        }
    }


    get pageNumber() {
        return this.pageNumberControl.value;
    }

    set pageNumber(value: number) {
        this.pageNumberControl.setValue(value);
        let tempStartIndex = 5 * (value - 1);
        this.searchDisplay = this.searchResultsData.slice(tempStartIndex, tempStartIndex + 5);
    }

    ngOnInit() {
        let filterValues: string[] = ["styles", "components", "guides", "bits"];
        let typeFilterValues: string[] = ["html", "Guides", "ts", "module"];

        this.categories.valueChanges.subscribe(categoryValues => {
            filterValues = [];
            for (const prop in categoryValues) {
                if (categoryValues[prop]) {
                    filterValues.push(prop);
                }
            }
            this.displayResults(filterValues, typeFilterValues);
        });

        this.types.valueChanges.subscribe(typeValues => {
            typeFilterValues = [];
            for (const prop in typeValues) {
                if (typeValues[prop]) {
                    typeFilterValues.push(prop);
                }
            }
            this.displayResults(filterValues, typeFilterValues);
        });

        this.miniSearch.addAll(searchJson);

        this.searchBar.valueChanges.subscribe((val) => {
            if (val !== '') {
                let res = this.miniSearch.search(val, {
                    filter: (result) => {
                        let ismatching = false;
                        filterValues.forEach(element => {
                            if (result.category === element) {
                                ismatching = true;
                            }
                        });
                        return ismatching;
                    }
                });
                console.log(res);
                this.length = res.length;
                this.searchResultsData = res;
                console.log(this.searchResultsData);
                this.searchDisplay = this.searchResultsData.slice(0, 5);
            } else {
                this.searchResultsData = [];
            }
        });
    }
}
