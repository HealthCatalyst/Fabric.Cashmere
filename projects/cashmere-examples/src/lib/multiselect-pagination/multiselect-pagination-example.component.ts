import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Multiselect with pagination
 */
@Component({
    selector: 'hc-multiselect-pagination-example',
    templateUrl: 'multiselect-pagination-example.component.html',
    styleUrls: ['multiselect-pagination-example.component.scss'],
    standalone: false
})
export class MultiselectPaginationExampleComponent implements OnInit, OnDestroy {
    // The complete list of available items
    encounterIDs: string[] = [];
    // The current page of items
    displayedEncounters: string[] = [];
    // The complete list filtered by typeahead
    filteredEncounters: string[] = [];
    // Event that fires on typeahead to trigger our custom function
    encounterSearch = new Subject<string>();

    // Access ng-select for our example refresh function
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

    private unsubscribe = new Subject<void>();
    selectedEncounter = new FormControl();
    pageNumber = 1;
    pageSize = 4;

    // The complete length of items filtered by typeahead
    get length(): number {
        return this.filteredEncounters.length;
    }

    ngOnInit(): void {
        this.refreshEncounters();

        // Custom typeahead function to search the entire list rather than just the current page
        this.encounterSearch.pipe(takeUntil(this.unsubscribe)).subscribe( (term) => {
            if ( term ) {
                this.filteredEncounters = [];
                this.pageNumber = 1;

                for( let i=0; i < this.encounterIDs.length; i++ ) {
                    if ( this.encounterIDs[i].includes( term ) ) {
                        this.filteredEncounters.push(this.encounterIDs[i]);
                    }
                }
            } else {
                // A null value means the typeahead was cleared
                this.filteredEncounters = [...this.encounterIDs];
            }
            
            this.updateDisplayedEncounters();
        });
    }

    // Update the current page of items when the page changes
    updateDisplayedEncounters(): void {
        this.displayedEncounters = [];
        for( let i=this.pageSize * (this.pageNumber-1); i < (this.pageSize * this.pageNumber) && i < this.filteredEncounters.length; i++ ) {
            this.displayedEncounters.push(this.filteredEncounters[i]);
        }
    }

    // An example of a function to load a full list of values
    refreshEncounters(): void {
        this.encounterIDs = [];
        this.filteredEncounters = [];
        this.pageNumber = 1;
        for( let i=0; i < 100; i++ ) {
            const idVal = Math.floor(Math.random() * 999999);
            this.encounterIDs.push(idVal.toString());
            this.filteredEncounters.push(idVal.toString());
        }

        this.updateDisplayedEncounters();

        // Clear any existing search strings
        if ( this.ngSelectComponent ) {
            this.ngSelectComponent.handleClearClick();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
