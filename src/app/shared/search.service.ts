import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import MiniSearch from 'minisearch';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    // MiniSearch variable initialization
    miniSearch = new MiniSearch({
        // These are the felids that minisearch is checking against
        fields: ['title', 'content'],
        // These are the felids that minisearch will return in an object
        storeFields: ['title', 'link', 'category', 'type'],
        searchOptions: {
            prefix: true,
            boost: { type: 20 },
            combineWith: 'AND'
        }
    });

    constructor(private http: HttpClient) {
        const loadSub: Subscription = this.loadSearchIndex().subscribe(data => {
            this.miniSearch.addAll(data);
            loadSub.unsubscribe();
        });
    }

    loadSearchIndex(): Observable<any> {
        return this.http.get<any>( './assets/docs/search/search.json' )
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log( error );
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Unable to retrieve Cashmere search index; please try again later.');
    }
}
