import {Component, AfterViewInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchService} from '../shared/search.service';
import {PageEvent} from '@healthcatalyst/cashmere';
import {ActivatedRoute} from '@angular/router';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements AfterViewInit {
    constructor(
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private searchService: SearchService,
        private appInsights: ApplicationInsightsService
    ) {}

    @ViewChild('pagContainer')
    pagContainer: ElementRef;

    pageOpts = [5, 10, 20];
    pagWidth = 'md';
    pagSize = 5;
    pagNum = 1;
    searchBarContent: FormControl = new FormControl('');
    searchResultsData;
    searchDisplay;
    length;

    categories = new FormGroup({
        components: new FormControl(true),
        guides: new FormControl(true),
        foundations: new FormControl(true),
        content: new FormControl(true),
        analytics: new FormControl(true)
    });

    types = new FormGroup({
        doc: new FormControl(true),
        example: new FormControl(true),
        api: new FormControl(true),
        usage: new FormControl(true),
        persona: new FormControl(true)
    });

    searchIcons = {
        components: {icon: 'fa-code'},
        guides: {icon: 'fa-graduation-cap'},
        foundations: {icon: 'fa-gears'},
        content: {icon: 'fa-file-lines'},
        analytics: {icon: 'fa-chart-bar'}
    };

    @HostListener('window:resize')
    _pagResize(): void {
        this.pagWidth = this.pagContainer.nativeElement.offsetWidth < 522 ? 'sm' : 'md';
    }

    ngAfterViewInit(): void {
        // String lists that take the values from the categories and types FormGroups
        let filterValues: string[] = ['foundations', 'components', 'guides', 'content', 'analytics'];
        let typeFilterValues: string[] = ['doc', 'example', 'api', 'usage', 'persona'];

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

        // Listens for changes inside the search bar and returns the value when there are changes
        this.searchBarContent.valueChanges.subscribe(val => {
            // Checks to make sure the search value is not empty or undefined
            if (val !== '' && val !== undefined) {
                const res = this.searchService.miniSearch.search(val, {
                    // Checks every result that matches the search value
                    filter: result => {
                        let isCategory = false;
                        let isType = false;
                        // Goes through each result and checks if the results category
                        //  matches any of the categories inside of filterValues
                        filterValues.forEach(element => {
                            if (result.category === element) {
                                isCategory = true;
                            }
                        });

                        // Goes through each result and checks if the results category
                        //  matches any of the categories inside of typeFilterValues
                        typeFilterValues.forEach(element => {
                            if (result.type === element) {
                                isType = true;
                            }
                        });

                        return isCategory && isType;
                    }
                });

                // Sets the length of results found
                this.length = res.length;
                // Sets searchResultsData to the results found
                this.searchResultsData = res;
                // Slices the results and returns the first five to be displayed
                this.searchDisplay = this.searchResultsData.slice(0, this.pagSize);
                this.pagNum = 1;
                this.ref.detectChanges();
            } else {
                // If the search value is empty, then searchResultsData is set to an empty array
                this.searchResultsData = [];
            }
        });

        //  Gets the search parameter value from the url
        this.route.queryParams.subscribe(params => {
            //  Sets the value of the searchBarContent to the search parameter value
            if (this.searchService.loaded.value) {
                this.searchBarContent.setValue(params['search']);
            } else {
                const searchSub = this.searchService.isLoaded.subscribe(value => {
                    if (value) {
                        this.searchBarContent.setValue(params['search']);
                        searchSub.unsubscribe();
                    }
                });
            }
        });

        this._pagResize();
    }

    /**Filters the results from miniSearch based on the filter values */
    displayResults(filterValues: string[], typeFilterValues: string[]): void {
        //  Checks if the searchBarContent value is empty or not
        if (this.searchBarContent.value !== '') {
            const res = this.searchService.miniSearch.search(this.searchBarContent.value, {
                // Checks every result that matches the search value
                filter: result => {
                    let isCategory = false;
                    let isType = false;
                    // Goes through each result and checks if the results category
                    //  matches any of the categories inside of filterValues
                    filterValues.forEach(element => {
                        if (result.category === element) {
                            isCategory = true;
                        }
                    });
                    // Goes through each result and checks if the results category
                    //  matches any of the categories inside of typeFilterValues
                    typeFilterValues.forEach(element => {
                        if (result.type === element) {
                            isType = true;
                        }
                    });

                    return isCategory && isType;
                }
            });
            // Sets the length of results found
            this.length = res.length;
            // Sets searchResultsData to the results found
            this.searchResultsData = res;
            // Slices the results and returns the first five to be displayed
            this.searchDisplay = this.searchResultsData.slice(0, 5);
            this.pagNum = 1;
            this.ref.detectChanges();
        } else {
            //  Gets the search parameter value from the url
            this.searchResultsData = [];
        }
    }

    resultPaging(setting: PageEvent): void {
        this.pagSize = setting.pageSize;
        this.pagNum = setting.pageNumber;
        const tempStartIndex = setting.pageSize * (setting.pageNumber - 1);
        this.searchDisplay = this.searchResultsData.slice(tempStartIndex, tempStartIndex + setting.pageSize);
        this.ref.detectChanges();
    }

    resetFilters(): void {
        this.categories.setValue({components: true, guides: true, foundations: true, content: true, analytics: true});
        this.types.setValue({doc: true, example: true, api: true, usage: true, persona: true});
    }

    logSearch(): void {
        this.appInsights.logSiteSearch(this.searchBarContent.value);
    }
}
