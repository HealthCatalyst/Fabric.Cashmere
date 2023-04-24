import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

export interface IPaginatorState {
    skip: number;
    take: number;
    total: number;
}

/** A control to paginate the results from a ng-select element */
@Component({
    selector: 'hc-multiselect-pagination',
    templateUrl: './multiselect-pagination.component.html',
    styleUrls: ['./multiselect-pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MultiselectPaginationComponent {
    @Input()
    public paginatorState: IPaginatorState;

    @Output()
    public refresh: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public stateChange: EventEmitter<IPaginatorState> = new EventEmitter<IPaginatorState>();

    public pageControl: UntypedFormControl = new UntypedFormControl();
    public currentPage = 1;
    public totalPages = 0;

    public ngOnInit(): void {
        this._initializePaginator(this.paginatorState);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.paginatorState) {
            this._initializePaginator(changes.paginatorState.currentValue);
        }
    }

    public onSkipToStartClicked(): void {
        this.currentPage = 1;
        this.pageControl.setValue(this.currentPage);

        this.stateChange.emit({
            ...this.paginatorState,
            skip: 0
        });
    }

    public onSkipToEndClicked(): void {
        this.currentPage = this.totalPages;
        this.pageControl.setValue(this.currentPage);

        this.stateChange.emit({
            ...this.paginatorState,
            skip: (this.totalPages - 1) * this.paginatorState.take
        });
    }

    public onPrevClicked(): void {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.pageControl.setValue(this.currentPage);

            this.stateChange.emit({
                ...this.paginatorState,
                skip: this.paginatorState.take * (this.currentPage - 1)
            });
        }
    }

    public onNextClicked(): void {
        if (this.currentPage + 1 <= this.totalPages) {
            this.currentPage += 1;
            this.pageControl.setValue(this.currentPage);

            this.stateChange.emit({
                ...this.paginatorState,
                skip: this.paginatorState.take * (this.currentPage - 1)
            });
        }
    }

    public onPageChange(event: any): void {
        const pageNumber = Number(event.target.value);
        event.stopPropagation();

        if (isNaN(pageNumber) || pageNumber > this.totalPages) {
            event.preventDefault();
        } else {
            this.currentPage = pageNumber;
            this.stateChange.emit({
                ...this.paginatorState,
                skip: this.paginatorState.take * (pageNumber - 1)
            });
        }
    }

    public onKeyDown(event: any): void {
        const pageNumber = Number(this.pageControl.value + event.key);
        event.stopPropagation();

        if (event.key === '-' || event.key === 'e' || pageNumber > this.totalPages) {
            event.preventDefault();
        }
    }

    public onPaste(event: any): void {
        event.stopPropagation();
        event.preventDefault();
    }

    public onRefreshClicked(): void {
        this.refresh.emit();
    }

    private _initializePaginator(paginatorState: IPaginatorState): void {
        if (paginatorState.take > 0) {
            this.totalPages = Math.max(Math.ceil(paginatorState.total / this.paginatorState.take), 1);
            this.currentPage = Math.min(Math.floor(paginatorState.skip / paginatorState.take) + 1, this.totalPages);

            this.pageControl.setValue(this.currentPage);
        }
    }

}
