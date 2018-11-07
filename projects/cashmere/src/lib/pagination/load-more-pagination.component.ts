import {Component, Input, OnInit} from '@angular/core';
import {validateStyleInput} from '../button/button.component';
import {BasePaginationComponent} from './base-pagination';

/** A simple "load more" pagination button.
 * */
@Component({
    selector: 'hc-load-more-pagination',
    templateUrl: './load-more-pagination.component.html'
})
export class LoadMorePaginationComponent extends BasePaginationComponent implements OnInit {
    /**
     * Text to show on the button
     */
    @Input() buttonText = 'Load more';

    /** Sets style of button. Choose from: `'primary' | 'primary-alt' | 'destructive' | 'neutral' | 'secondary' | 'link' | 'link-inline'`.
     * *Defaults to `primary-alt`.*
     */
    @Input()
    get buttonStyle(): string {
        return this._style;
    }

    set buttonStyle(btnStyle: string) {
        validateStyleInput(btnStyle);
        this._style = btnStyle;
    }
    private _style: string = 'primary-alt';

    _loadNextPage() {
        if (this._isLastPage) {
            return;
        }
        this.pageNumber = this.pageNumber + 1;
    }
}
