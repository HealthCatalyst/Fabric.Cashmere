import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'hc-search-bar',
    templateUrl: 'search-bar.component.html',
    styleUrls: ['search-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit, OnDestroy {
    /** Placeholder text for the search bar. *Defaults to `Search`.* */
    @Input() placeholder = 'Search';
    /** If true, disables the search bar. *Defaults to `false`.* */
    @Input() disabled = false;
    /** Preseed the search bar with a particular text value. *Defaults to empty string.* */
    @Input() initialSearchTerm = '';
    /** If true, show the search icon in the right side of the search bar. *Defaults to true.* */
    @Input() showSearchIcon = true;
    /** If true, show a clickable clear icon in the right side of the search bar when there's a search term present. *Defaults to true.* */
    @Input() showClearIcon = true;
    /** If true, fire triggerSearch event on user keyup (with a built-in 100ms debounce). *Defaults to true.* */
    @Input() autoSearch = true;
    /** Fires when a search should be run. Outputs the search term. */
    @Output() triggerSearch = new EventEmitter<string>();
    @ViewChild('searchFilter', {static: true}) private searchBar: ElementRef;
    /** Returns the current search term. */
    public get value(): string {
        return this.searchBar.nativeElement.value;
    }
    private searchStream = new Subject<string>();
    private destroy$ = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public ngOnInit(): void {
        this.searchStream
            .pipe(debounceTime(100), distinctUntilChanged())
            .pipe(takeUntil(this.destroy$))
            .subscribe(t => {
                this.triggerSearch.emit(t);
            });
        if (this.initialSearchTerm) {
            this.setValue(this.initialSearchTerm);
        }
    }

    /** Places focus in the search bar. */
    public focus(): void {
        this.searchBar.nativeElement.focus();
    }

    /** Manually set the value of the search bar. */
    public setValue(val: string): void {
        this.searchBar.nativeElement.value = val;
    }

    public _onKeyUp(event: KeyboardEvent, term: string): void {
        if (event.key !== 'Tab' && this.autoSearch) {
            this.searchStream.next(term);
        }
    }

    /** Clear out search bar and trigger search. */
    public clear(): void {
        this.searchBar.nativeElement.value = '';
        this.searchStream.next('');
    }

    /** Manually trigger search event. Optionally pass in a value to search for */
    public search(term = ''): void {
        term = term || this.searchBar.nativeElement.value;
        this.setValue(term);
        this.searchStream.next(term);
    }

    public _onEnter(term: string): void {
        this.triggerSearch.emit(term);
    }
}
