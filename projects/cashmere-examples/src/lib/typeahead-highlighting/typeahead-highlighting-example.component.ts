import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-typeahead-highlighting-example',
    templateUrl: './typeahead-highlighting-example.component.html',
    styleUrls: ['./typeahead-highlighting-example.component.scss']
})
export class TypeaheadHighlightingExampleComponent implements OnInit {
    form: FormGroup;
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

    typedChars = '';

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            item: ['']
        });
    }

    filterData(term) {
        this.typedChars = term;
        this.setValue(term);
        if (term) {
            this.filteredData = this.typeaheadData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.typeaheadData;
        }
    }

    optionSelected(item) {
        this.setValue(item);
    }

    private setValue(item) {
        const control = this.form.get('item');
        if (control) {
            control.setValue(item);
        }
    }
}
