import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { PicklistRemoteDataService, Person } from './picklist-remote-data.service';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PicklistComponent } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-picklist-remote-data-example',
    templateUrl: './picklist-remote-data-example.component.html',
    standalone: false
})
export class PicklistRemoteDataExampleComponent implements OnInit {
    @ViewChild(PicklistComponent) picklist: PicklistComponent;
    people$: Observable<Person[]>;
    peopleLoading = true;
    peopleInput$ = new Subject<string>();
    selectedPersons: Person[] = [];
    remoteCount = 125;
    // using .bind() to maintain a scope that allows me access to the dataService in a callback function
    addCustomItemFn = this.addCustomItem.bind(this);

    constructor(public dataService: PicklistRemoteDataService) {}

    ngOnInit(): void {
        this.loadPeople();
    }

    trackByFn(item: Person): string {
        return item.id;
    }

    addCustomItem(term: string): Person {
        const customItem = {
            id: `1234-${term}`,
            age: Math.floor(Math.random() * 40) + 18,
            name: term
        };
        this.dataService.mockPeople.push(customItem);
        return customItem;
    }

    onChange(): void {
        this.remoteCount = this.dataService.mockPeople.length - this.selectedPersons.length;
        if (this.picklist.leftPaneIsEmpty && this.remoteCount > 0) {
            this.peopleLoading = true;
            this.loadPeople();
        }
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
