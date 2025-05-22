import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Transport { name: string, icon: string, color: string, type: string | null }
@Component({
    selector: 'hc-picklist-templates-example',
    templateUrl: './picklist-templates-example.component.html',
    styleUrls: ['./picklist-templates-example.component.scss'],
    standalone: false
})
export class PicklistTemplatesExampleComponent {

    readonly selected = new FormControl([], {nonNullable: true});
    transportOptions: Transport[] = [
        {name: 'Train', icon: 'train', color: 'green', type: 'land'},
        {name: 'Bus', icon: 'bus', color: 'blue', type: 'land'},
        {name: 'Ferry', icon: 'ship', color: 'teal', type: 'sea'},
        {name: 'Space Shuttle', icon: 'space-shuttle', color: 'slate-gray', type: 'air'},
        {name: 'Plane', icon: 'plane', color: 'deep-red', type: 'air'},
        {name: 'Rocket', icon: 'rocket', color: 'orange', type: 'air'},
        {name: 'Sled', icon: 'snowflake-o', color: 'purple', type: null }
    ];

    groupByFn = (item: Transport ): string | null => item.type;

    customSearchFn(term: string, item: Transport): boolean {
        term = term?.toLowerCase();
        return item.name.toLowerCase().indexOf(term) > -1 || (!!item.type && item.type.toLowerCase().indexOf(term) > -1);
    }

    sortFn(a: { label: string }, b: { label: string }): number {
        return a.label.localeCompare(b.label);
    }
}
