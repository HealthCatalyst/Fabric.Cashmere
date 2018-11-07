import {Component} from '@angular/core';
import {PageEvent} from '@healthcatalyst/cashmere';

/**
 * @title Simple button pagination
 */
@Component({
    selector: 'pagination-load-more-example',
    templateUrl: 'pagination-load-more-example.html',
    styleUrls: ['pagination-load-more-example.css']
})
export class PaginationLoadMoreExample {
    buttonText = 'Load more items';
    buttonStyle = 'primary-alt';
    length = 100;
    pageNumber = 1;
    pageSize = 20;
    displayed = "1-10";

    onLoadMore(pageEvent: PageEvent) {
        setTimeout(() => { this.updateDisplay(pageEvent); }, 20);
    }

    updateDisplay(pageEvent: PageEvent) {
        this.displayed = `1-${pageEvent.pageNumber * pageEvent.pageSize}`;
        console.log("pageEvent", pageEvent);
    }
}
