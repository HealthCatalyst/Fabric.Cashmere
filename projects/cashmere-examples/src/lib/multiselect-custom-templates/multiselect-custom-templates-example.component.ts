import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

interface Transport { name: string, icon: string, color: string, type: string | null }

/**
 * @title Multiselect with customized templates
 */
@Component({
    selector: 'hc-multiselect-custom-templates-example',
    templateUrl: 'multiselect-custom-templates-example.component.html',
    styleUrls: ['multiselect-custom-templates-example.component.scss'],
    standalone: false
})
export class MultiselectCustomTemplatesExampleComponent {
    readonly selected = new FormControl([], {nonNullable: true});
    transportOptions: Transport[] = [
        {name: 'Bus', icon: 'bus', color: 'blue', type: 'land'},
        {name: 'Train', icon: 'train', color: 'green', type: 'land'},
        {name: 'Ferry', icon: 'ship', color: 'teal', type: 'sea'},
        {name: 'Plane', icon: 'plane', color: 'purple', type: 'air'},
        {name: 'Rocket', icon: 'rocket', color: 'orange', type: 'air'},
        {name: 'Space Shuttle', icon: 'space-shuttle', color: 'dark-blue', type: 'air'}
    ];

    customSearchFn(term: string, item: Transport): boolean {
        term = term.toLowerCase();
        return item.name.toLowerCase().indexOf(term) > -1 || (!!item.type && item.type.toLowerCase().indexOf(term) > -1);
    }
}
