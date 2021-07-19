import { Component } from '@angular/core';

@Component({
    selector: 'hc-picklist-hc-pick-option-example',
    templateUrl: './picklist-hc-pick-option-example.component.html',
})
export class PicklistHcPickOptionExampleComponent {

    selected = [];
    veggies = [
        { id: 1, name: 'Celery' },
        { id: 2, name: 'Kale' },
        { id: 3, name: 'Cabbage' },
        { id: 4, name: 'Jicama' },
        { id: 5, name: 'Okra' },
        { id: 6, name: 'Fennel' },
        { id: 7, name: 'Bell Pepper' },
        { id: 8, name: 'Cucumber', disabled: true }
    ];

    toggleDisabled(): void {
        const veg = this.veggies[7];
        veg.disabled = !veg.disabled;
    }
}
