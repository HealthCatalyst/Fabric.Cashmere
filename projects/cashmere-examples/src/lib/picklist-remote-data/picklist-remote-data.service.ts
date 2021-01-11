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
export class PicklistRemoteDataService {
    mockPeople = names.map((n, index) => {
        return {
            id: `1234${index}`,
            age: Math.floor(Math.random() * 40) + 18,
            name: n
        };
    });

    getPeople(term: string = "", selectedPersons: Array<Person>): Observable<Person[]> {
        let items = this.mockPeople.filter(mp => !selectedPersons.some(sp => sp.id === mp.id));
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1).slice(0, 50);
        } else {
            items = items.slice(0, 50);
        }
        return of(items).pipe(delay(1000));
    }
}

const names = ['Karyn Wright', 'Rochelle Estes', 'Mendoza Ruiz', 'Rosales Russell', 'Marquez Nolan', 'Franklin James', 'Elsa Bradley', 'Pearson Thompson', 'Ina Pugh', 'Nguyen Elliott', 'Mills Barnett', 'Margaret Reynolds', 'Yvette Navarro', 'Elisa Guzman', 'Jodie Bowman', 'Diann Booker', 'Harriet Hamilton', 'Ruby Pearce', 'Zoe Stewart', 'Zoey Ellis', 'Evelyn Harvey', 'Matthew Spencer', 'Sebastian Gray', 'Aiden Bell', 'Braxton Watson', 'Justin Wright', 'Hayley Baker', 'Alyssa James', 'Emily Rogers', 'Sarah Elliott', 'Lily White', 'Penelope Webb', 'Harriet Fowler', 'Amelia Campbell', 'Maryam Blair', 'Elsie Fern', 'Toby James', 'James Harris', 'Liam Duncan', 'Joshua Bailey', 'Blake Thompson', 'Jesse Tanner', 'Noah McDonald', 'Bodhi Bell', 'Harley Horner', 'Archer Hansen', 'Ivy Wright', 'Millie Tran', 'Elena Flanagan', 'Poppy Cooper', 'Florence Simpson', 'Mikayla Nevin', 'Eliana Martin', 'Bella Clemens', 'Isabella Stevens', 'Matilda Connell', 'Aaron Parker', 'Declan Horner', 'Harrison Gilbert', 'Arlo Johnson', 'Ethan Hughes', 'Noah Ronin', 'Aidan Lucas', 'Maxwell Tanner', 'Spencer Thompson', 'Blake McLean', 'Sienna Weaving', 'Aria Butler', 'Scarlett Wynter', 'Mariam Brown', 'Abigail Horner', 'Natalie Madden', 'Eliana Phillips', 'Amy Richardson', 'Caitlin Harrison', 'Ruby Holt', 'Leon Kennedy', 'Benjamin Morgan', 'Alex Crowe', 'Spencer Wilson', 'Vincent Weaver', 'Chase Ryan', 'Kai King', 'Finn Palmer', 'Lachlan Moore', 'Leo Matthews', 'Sadie Walsman', 'Harriet Roberts', 'Molly Smith', 'Leah Noble', 'Florence Robbinson', 'Eliana Thompson', 'Sophie Swan', 'Amelie Helman', 'Matilda Quin', 'Eleanor Harrison', 'Seth Bennett', 'Sonny Fern', 'Cody Mason', 'Ethan Irwin', 'David Knight', 'Koby Richardson', 'Toby Whitworth', 'Thomas Crowe', 'Oliver Rogers', 'Hunter Tanner', 'Frances Levine', 'Peggy Gregory', 'Rosie Love', 'Wanda Wiggins', 'Deborah Park', 'Sheryl Lowery', 'Sheri Rose', 'Audrey Watkins', 'Angelica Lawrence', 'Megan Blevins', 'Angelo Barrett', 'Thomas Woods', 'Morris Britt', 'Alex Dean', 'Louis Freeman', 'Alfred Heath', 'Clifford Terrell', 'Calvin Buckley', 'Aaron Marshall', 'Giovanni Cash'];