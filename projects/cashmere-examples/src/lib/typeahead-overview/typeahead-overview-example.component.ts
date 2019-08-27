import {Component} from '@angular/core';

@Component({
    selector: 'hc-typeahead-overview-example',
    templateUrl: './typeahead-overview-example.component.html',
    styleUrls: ['./typeahead-overview-example.component.scss']
})
export class TypeaheadOverviewExampleComponent {

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
