import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {validateStyleInput} from '../button/button.component';
import {BasePaginationComponent} from './base-pagination';

/** A simple "load more" pagination button. */
@Component({
    selector: 'hc-load-more-pagination',
    templateUrl: './load-more-pagination.component.html',
    styleUrls: ['./load-more-pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoadMorePaginationComponent extends BasePaginationComponent implements OnInit {
    /**
     * Text to show on the button. *Defaults to 'Load more'.*
     */
    @Input()
    buttonText = 'Load more';

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'`.
     * *Defaults to `'secondary'`.*
     */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }

    set buttonStyle(btnStyle: string) {
        validateStyleInput(btnStyle, 'LoadMorePaginationComponent');
        this._style = btnStyle;
    }
    private _style = 'secondary';

    _loadNextPage() {
        if (this._isLastPage) {
            return;
        }
        this.pageNumber = this.pageNumber + 1;
    }
}
