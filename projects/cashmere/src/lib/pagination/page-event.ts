/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
    /** The current page index */
    pageNumber: number;

    /** Index of the page that was selected previously */
    previousPageNumber?: number;

    /** The current page size */
    pageSize: number;

    /** The current total number of items being paged */
    length: number;
}
