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
    remoteCount = this.dataService.mockPeople.length - this.selectedPersons.length

    constructor(public dataService: Picklist2RemoteDataService) {}

    ngOnInit() {
        this.loadPeople();
    }

    trackByFn(item: Person) {
        return item.id;
    }

    // using .bind() to maintain a scope that allows me access to the dataService in a callback function
    addCustomItemFn = this.addCustomItem.bind(this);

    addCustomItem(term: string): Person {
        const customItem = {
            id: `1234-${term}`,
            age: Math.floor(Math.random() * 40) + 18,
            name: term
        };
        this.dataService.mockPeople.push(customItem);
        return customItem;
    }

    updateExternalCount() {
        this.remoteCount = this.dataService.mockPeople.length - this.selectedPersons.length;
    }

    private loadPeople() {
        this.people$ = concat(
            of([]), // default items
            this.peopleInput$.pipe(
                distinctUntilChanged(),
                tap(() => this.peopleLoading = true),
                switchMap(term => this.dataService.getPeople(term, this.selectedPersons).pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => { this.peopleLoading = false; }),
                ))
            )
        );
    }
}
