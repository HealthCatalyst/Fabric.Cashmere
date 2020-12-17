import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Person {
    id: string;
    age: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class Picklist2RemoteDataService {
    getPeople(term: string = "", selectedPersons: Array<Person>): Observable<Person[]> {
        let items = this.mockPeople.filter(mp => !selectedPersons.some(sp => sp.id === mp.id));
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        } else {
            items = items.slice(0, 10);
        }
        console.log("items", items);
        return of(items).pipe(delay(1000));
    }

    mockPeople = [
        {
            'id': '12345',
            'age': 23,
            'name': 'Karyn Wright',
        },
        {
            'id': '12346',
            'age': 35,
            'name': 'Rochelle Estes',
        },
        {
            'id': '12347',
            'age': 25,
            'name': 'Mendoza Ruiz',
        },
        {
            'id': '12348',
            'age': 39,
            'name': 'Rosales Russell',
        },
        {
            'id': '12349',
            'age': 32,
            'name': 'Marquez Nolan',
        },
        {
            'id': '12350',
            'age': 28,
            'name': 'Franklin James',
        },
        {
            'id': '12351',
            'age': 24,
            'name': 'Elsa Bradley',
        },
        {
            'id': '12352',
            'age': 40,
            'name': 'Pearson Thompson',
        },
        {
            'id': '12353',
            'age': 32,
            'name': 'Ina Pugh',
        },
        {
            'id': '12354',
            'age': 25,
            'name': 'Nguyen Elliott',
        },
        {
            'id': '12355',
            'age': 31,
            'name': 'Mills Barnett',
        },
        {
            'id': '12356',
            'age': 36,
            'name': 'Margaret Reynolds',
        },
        {
            'id': '12357',
            'age': 29,
            'name': 'Yvette Navarro',
        },
        {
            'id': '12358',
            'age': 20,
            'name': 'Elisa Guzman',
        },
        {
            'id': '12359',
            'age': 33,
            'name': 'Jodie Bowman',
        },
        {
            'id': '12360',
            'age': 24,
            'name': 'Diann Booker',
        },
        {
            'id': '12361',
            'age': 32,
            'name': 'Harriet Hamilton',
        },
        {
            'id': '12362',
            'age': 32,
            'name': 'Ruby Pearce',
        },
        {
            'id': '12363',
            'age': 32,
            'name': 'Zoe Stewart',
        },
        {
            'id': '12364',
            'age': 32,
            'name': 'Zoey Ellis',
        },
        {
            'id': '12365',
            'age': 32,
            'name': 'Evelyn Harvey',
        },
        {
            'id': '12366',
            'age': 32,
            'name': 'Matthew Spencer',
        },
        {
            'id': '12367',
            'age': 32,
            'name': 'Sebastian Gray',
        },
        {
            'id': '12368',
            'age': 32,
            'name': 'Aiden Bell',
        },
        {
            'id': '12369',
            'age': 32,
            'name': 'Braxton Watson',
        },
        {
            'id': '12370',
            'age': 32,
            'name': 'Justin Wright',
        },
    ];
}