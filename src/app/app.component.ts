import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './shared/search.service';
import { HcPopComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    @ViewChild('search') search: HcPopComponent;
    @ViewChild('searchInput') input: any;

    navSearchBar = new FormControl('');

    searchResults;
    showAll = false;
    searchValue = '';
    searchIcons = {
        'components': { icon: 'fa-file-code-o' },
        'guides': { icon: 'fa-file-text-o' },
        'styles': { icon: 'fa-file-image-o' },
        'bits': { icon: 'fa-puzzle-piece' }
    };

    constructor( private searchService: SearchService ) { }

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
}



