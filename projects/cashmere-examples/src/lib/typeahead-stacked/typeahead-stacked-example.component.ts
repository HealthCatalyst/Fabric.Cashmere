import {Component} from '@angular/core';

@Component({
    selector: 'hc-typeahead-stacked-example',
    templateUrl: './typeahead-stacked-example.component.html',
    styleUrls: ['./typeahead-stacked-example.component.scss']
})
export class TypeaheadStackedExampleComponent {

    selectedItem = '';
    filteredData: string[] = [];
    typeaheadData = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia'
    ];

    constructor() {
    }

    filterData(term) {
        console.log(term);
        if (term) {
            this.filteredData = this.typeaheadData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.typeaheadData;
        }
    }

    optionSelected(item) {
        this.selectedItem = item;
    }
}
