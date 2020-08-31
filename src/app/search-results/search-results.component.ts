import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as searchJson from '../../../dist/search/search.json';
import { PaginationComponent, HcTableDataSource } from '@healthcatalyst/cashmere';
import { ActivatedRoute } from '@angular/router';
import MiniSearch from 'minisearch';

@Component({
    selector: 'hc-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements AfterViewInit, OnInit {

    constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef) { }

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
        ts: new FormControl(true)
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
        let filterValues: string[] = ["styles", "components", "guides", "bits"];
        let typeFilterValues: string[] = ["html", "Guides", "ts"];

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
                this.length = res.length;
                this.searchResultsData = res;
                this.searchDisplay = this.searchResultsData.slice(0, 5);
                this.ref.detectChanges();
            } else {
                this.searchResultsData = [];
            }
        });

        this.route.queryParams.subscribe(params => {
            this.searchBar.setValue(params['search']);
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
            this.length = res.length;
            this.searchResultsData = res;
            this.searchDisplay = this.searchResultsData.slice(0, 5);
            this.ref.detectChanges();
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
        this.ref.detectChanges();
    }

    ngOnInit() {

    }
}
