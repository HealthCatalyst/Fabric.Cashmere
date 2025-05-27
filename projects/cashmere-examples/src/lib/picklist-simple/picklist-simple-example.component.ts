import {Component} from '@angular/core';

@Component({
    selector: 'hc-picklist-simple-example',
    templateUrl: 'picklist-simple-example.component.html',
    standalone: false
})
export class PicklistSimpleExampleComponent {
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
        { id: 5, name: 'Toyota' },
        { id: 6, name: 'Ford' },
        { id: 7, name: 'GM' },
        { id: 8, name: 'Nissan' },
        { id: 9, name: 'Honda' },
        { id: 10, name: 'Chevy' }
    ];

    selectedCars = [3];
}
