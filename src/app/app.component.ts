import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './shared/search.service';
import { HcPopComponent } from '@healthcatalyst/cashmere';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit, OnDestroy {
    @ViewChild('search') search: HcPopComponent;
    @ViewChild('searchInput') input: any;

    navSearchBar = new FormControl('');
    webActive = false;
    private unsubscribe = new Subject<void>();

    searchResults;
    showAll = false;
    searchValue = '';
    searchIcons = {
        'components': { icon: 'fa-code' },
        'guides': { icon: 'fa-graduation-cap' },
        'foundations': { icon: 'fa-cogs' },
        'bits': { icon: 'fa-puzzle-piece' },
        'content': { icon: 'fa-file-text-o' },
        'analytics': { icon: 'fa-bar-chart' }
    };

    constructor( private router: Router, private searchService: SearchService ) {
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.webActive = event.url.includes( '/web' );
            }
        });
    }

    ngAfterViewInit() {
        this.navSearchBar.valueChanges.subscribe((val) => {
            if (val !== '') {
                let tempResults = this.getItems(val);
                this.searchResults = tempResults.slice(0, 5);
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

    getItems = (value: string) => {
        let results = this.searchService.miniSearch.search(value);
        return results;
    }

    setInputFocus() {
        this.input.nativeElement.focus();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}



