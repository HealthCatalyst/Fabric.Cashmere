import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Multiselect with customized templates
 */
@Component({
    selector: 'hc-multiselect-custom-templates-example',
    templateUrl: 'multiselect-custom-templates-example.component.html',
    styleUrls: ['multiselect-custom-templates-example.component.scss']
})
export class MultiselectCustomTemplatesExampleComponent {
    readonly selected = new FormControl([]);
    transportOptions = [
        {name: 'Bus', icon: 'bus', color: 'blue', type: 'land'},
        {name: 'Train', icon: 'train', color: 'green', type: 'land'},
        {name: 'Ferry', icon: 'ship', color: 'teal', type: 'sea'},
        {name: 'Plane', icon: 'plane', color: 'purple', type: 'air'},
        {name: 'Rocket', icon: 'rocket', color: 'orange', type: 'air'},
        {name: 'Space Shuttle', icon: 'space-shuttle', color: 'dark-blue', type: 'air'}
    ];

    customSearchFn(term: string, item: any) {
        term = term.toLowerCase();
        return item.name.toLowerCase().indexOf(term) > -1 || item.type.toLowerCase().indexOf(term) > -1;
    }
}
