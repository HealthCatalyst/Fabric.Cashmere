import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { Picklist2RemoteDataService, Person } from './picklist2-remote-data.service';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Picklist2Component } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-picklist2-remote-data-example',
    templateUrl: './picklist2-remote-data-example.component.html'
})
export class Picklist2RemoteDataExampleComponent implements OnInit {
    @ViewChild(Picklist2Component) picklist: Picklist2Component;
    people$: Observable<Person[]>;
    peopleLoading = true;
    peopleInput$ = new Subject<string>();
    selectedPersons: Person[] = <any>this.dataService.mockPeople.slice(0,2);

    constructor(public dataService: Picklist2RemoteDataService) {}

    ngOnInit() {
        this.loadPeople();
    }

    trackByFn(item: Person) {
        return item.id;
    }

    private loadPeople() {
        this.people$ = concat(
            of([]), // default items
            this.peopleInput$.pipe(
                distinctUntilChanged(),
                tap(() => this.peopleLoading = true),
                switchMap(term => this.dataService.getPeople(term, this.selectedPersons).pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => { this.peopleLoading = false; })
                ))
            )
        );
    }
}
