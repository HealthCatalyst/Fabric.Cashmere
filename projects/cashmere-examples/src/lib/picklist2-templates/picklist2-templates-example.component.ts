import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-picklist2-templates-example',
    templateUrl: './picklist2-templates-example.component.html',
    styleUrls: ['./picklist2-templates-example.component.scss']
})
export class Picklist2TemplatesExampleComponent {

    readonly selected = new FormControl([]);
    transportOptions = [
        {name: 'Train', icon: 'train', color: 'green', type: 'land'},
        {name: 'Bus', icon: 'bus', color: 'blue', type: 'land'},
        {name: 'Ferry', icon: 'ship', color: 'teal', type: 'sea'},
        {name: 'Space Shuttle', icon: 'space-shuttle', color: 'slate-gray', type: 'air'},
        {name: 'Plane', icon: 'plane', color: 'deep-red', type: 'air'},
        {name: 'Rocket', icon: 'rocket', color: 'orange', type: 'air'},
        {name: 'Sled', icon: 'snowflake-o', color: 'purple', type: null }
    ];

    groupByFn = (item) => item.type;

    customSearchFn(term: string, item: any) {
        term = term?.toLowerCase();
        return item.name?.toLowerCase().indexOf(term) > -1 || item.type?.toLowerCase().indexOf(term) > -1;
    }

    sortFn(a: any, b: any) {
        return a.label.localeCompare(b.label);
    }
}
