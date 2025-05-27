import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApplicationInsightsService } from '../../shared/application-insights/application-insights.service';

export interface Version {
    version: string;
    releasedate: string;
    download: string;
    requirements: string;
    notes: string[];
}

@Component({
    selector: 'hc-analytics-template',
    templateUrl: './analytics-template.component.html',
    styleUrls: ['./analytics-template.component.scss'],
    standalone: false
})
export class AnalyticsTemplateComponent {
    platform: string;
    versionList: Version[] = [];

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private appInsights: ApplicationInsightsService) {
        if ( activatedRoute.snapshot.data['category'] ) {
            this.platform = activatedRoute.snapshot.data['category'];

            const versionSub = this.getVersions().subscribe( versions => {
                this.versionList = versions;
                versionSub.unsubscribe();
            });
        }
    }

    getVersions(): Observable<Version[]> {
        const platformStr = this.platform.replace(/\s/g, '');
        return this.http.get<Version[]>( '/assets/analytics/' + platformStr.toLowerCase() + '-template.json' )
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    templateClick( templateLink: string, platform: string ): void {
        this.appInsights.logTemplateDownload( platform );
        window.open( templateLink, '_blank' )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Unable to retrieve the template versions; please try again later.');
    }
}
