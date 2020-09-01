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

export class SearchResultsComponent implements AfterViewInit {

    constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef) { }

    searchBarContent: FormControl = new FormControl("");
    searchResultsData;
    searchDisplay;
    length;

    categories = new FormGroup({
        components: new FormControl(true),
        guides: new FormControl(true),
        styles: new FormControl(true),
        bits: new FormControl(true)
    });

    types = new FormGroup({
        html: new FormControl(false),
        Guides: new FormControl(false),
        ts: new FormControl(false)
    });

    // Functions to get the current page
    pageNumberControl = new FormControl(1);

    // MiniSearch variable initialization
    miniSearch = new MiniSearch({
        // These are the felids that minisearch is checking against
        fields: ['title', 'type'],
        // These are the felids that minisearch will return in an object
        storeFields: ['title', 'content', 'link', 'category', 'type', 'section'],
        searchOptions: {
            prefix: true,
            boost: { type: 20 }
        }
    });

    ngAfterViewInit() {
        // String lists that take the values from the categories and types FormGroups
        let filterValues: string[] = ["styles", "components", "guides", "bits"];
        let typeFilterValues: string[] = [];

        // Listens for changes in the categories FormGroup
        this.categories.valueChanges.subscribe(categoryValues => {
            // Resets the values inside the filterValues list
            filterValues = [];
            for (const prop in categoryValues) {
                // Checks to see if the value of the category is true
                if (categoryValues[prop]) {
                    // Adds the value of the category to the filterValues List
                    filterValues.push(prop);
                }
            }
            // Calls displayResults with the new filterValues
            this.displayResults(filterValues, typeFilterValues);
        });

        // Listens for changes in the types FormGroup
        this.types.valueChanges.subscribe(typeValues => {
            // Resets the values inside the types list
            typeFilterValues = [];
            for (const prop in typeValues) {
                // Checks to see if the value of the types is true
                if (typeValues[prop]) {
                    typeFilterValues.push(prop);
                }
            }
            // Calls displayResults with the new types values
            this.displayResults(filterValues, typeFilterValues);
        });

        // Adds the searchJson data into miniSearch
        this.miniSearch.addAll(searchJson);

        // Listens for changes inside the search bar and returns the value when there are changes
        this.searchBarContent.valueChanges.subscribe((val) => {
            // Checks to make sure the search value is not empty or undefined
            if (val !== '' && val !== undefined) {
                let res = this.miniSearch.search(val, {
                    // Checks every result that matches the search value
                    filter: (result) => {
                        let isMatching = false;
                        // Goes through each result and checks if the results category
                        //  matches any of the categories inside of filterValues
                        filterValues.forEach(element => {
                            if (result.category === element) {
                                isMatching = true;
                            }
                        });

                        // Goes through each result and checks if the results category
                        //  matches any of the categories inside of typeFilterValues
                        typeFilterValues.forEach(element => {
                            if (result.type === element) {
                                isMatching = true;
                            }
                        });

                        return isMatching;
                    }
                });

                // Sets the length of results found
                this.length = res.length;
                // Sets searchResultsData to the results found
                this.searchResultsData = res;
                // Slices the results and returns the first five to be displayed
                this.searchDisplay = this.searchResultsData.slice(0, 5);
                console.log(this.searchDisplay);
                this.ref.detectChanges();
            } else {
                // If the search value is empty, then searchResultsData is set to an empty array
                this.searchResultsData = [];
            }
        });

        //  Gets the search parameter value from the url
        this.route.queryParams.subscribe(params => {
            //  Sets the value of the searchBarContent to the search parameter value
            this.searchBarContent.setValue(params['search']);
        });

    }

    /**Filters the results from miniSearch based on the filter values */
    displayResults(filterValues, typeFilterValues) {
        //  Checks if the searchBarContent value is empty or not
        if (this.searchBarContent.value !== '') {
            let res = this.miniSearch.search(this.searchBarContent.value, {
                // Checks every result that matches the search value
                filter: (result) => {
                    let isMatching = false;
                    // Goes through each result and checks if the results category
                    //  matches any of the categories inside of filterValues
                    filterValues.forEach(element => {
                        if (result.category === element) {
                            isMatching = true;
                        }
                    });
                    // Goes through each result and checks if the results category
                    //  matches any of the categories inside of typeFilterValues
                    typeFilterValues.forEach(element => {
                        if (result.type === element) {
                            isMatching = true;
                        }
                    });

                    return isMatching;
                }
            });
            // Sets the length of results found
            this.length = res.length;
            // Sets searchResultsData to the results found
            this.searchResultsData = res;
            // Slices the results and returns the first five to be displayed
            this.searchDisplay = this.searchResultsData.slice(0, 5);
            this.ref.detectChanges();
        } else {
            //  Gets the search parameter value from the url
            this.searchResultsData = [];
        }
    }

    // Gets the current page number that the user is on
    get pageNumber() {
        return this.pageNumberControl.value;
    }

    // Sets the page number that the user is on
    set pageNumber(value: number) {
        this.pageNumberControl.setValue(value);
        let tempStartIndex = 5 * (value - 1);
        this.searchDisplay = this.searchResultsData.slice(tempStartIndex, tempStartIndex + 5);
        this.ref.detectChanges();
    }
}
