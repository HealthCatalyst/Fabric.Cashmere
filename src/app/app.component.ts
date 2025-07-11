import { Component, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './shared/search.service';
import { HcPopComponent } from '@healthcatalyst/cashmere';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchResult } from 'minisearch';
import { ApplicationInsightsService } from './shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
    standalone: false
})

export class AppComponent implements AfterViewInit, OnDestroy {
    @ViewChild('search') search: HcPopComponent;
    @ViewChild('searchInput') input: ElementRef;

    searchUpdated = false;
    navSearchBar = new FormControl('', {nonNullable: true});
    webActive = false;
    private unsubscribe = new Subject<void>();

    searchResults;
    showAll = false;
    searchValue = '';
    searchIcons = {
        'components': { icon: 'icon-code' },
        'guides': { icon: 'icon-grad' },
        'foundations': { icon: 'icon-cogs' },
        'content': { icon: 'icon-file-lines' },
        'analytics': { icon: 'icon-chart-bar' }
    };

    constructor( private router: Router, private searchService: SearchService, private appInsights: ApplicationInsightsService ) {
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.webActive = event.url.includes( '/web' );
            }
        });
    }

    ngAfterViewInit(): void {
        this.navSearchBar.valueChanges.subscribe((val) => {
            if (val !== '') {
                const tempResults = this.getItems(val);
                this.searchResults = tempResults.slice(0, 5);
                this.searchUpdated = true;
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
    }

    getItems = (value: string): SearchResult[] => {
        const results = this.searchService.miniSearch.search(value);
        return results;
    }

    setInputFocus(): void {
        this.input.nativeElement.focus();
    }

    logSearch(): void {
        if ( this.searchUpdated ) {
            this.appInsights.logSiteSearch( this.navSearchBar.value );
        }
        this.searchUpdated = false;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
