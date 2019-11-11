import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-typeahead-highlighting-object-example',
    templateUrl: './typeahead-highlighting-object-example.component.html',
    styleUrls: ['./typeahead-highlighting-object-example.component.scss']
})
export class TypeaheadHighlightingObjectExampleComponent implements OnInit {
    form: FormGroup;
    filteredData: object[] = [];
    typeaheadData = [
        {'name': 'Alabama',
         'year': 1819,
         'flower': 'Camellia'
        },
        {'name': 'Alaska',
        'year': 1959,
        'flower': 'Forget-Me-Not'
        },
        {'name': 'Arizona',
        'year': 1912,
        'flower': 'Saguaro Blossom'
        },
        {'name': 'Arkansas',
        'year': 1836,
        'flower': 'Apple Blossom'
        },
        {'name': 'California',
        'year': 1850,
        'flower': 'California Poppy'
        },
        {'name': 'Colorado',
        'year': 1876,
        'flower': 'Blue Columbine'
        },
        {'name': 'Connecticut',
        'year': 1788,
        'flower': 'Mountain Laurel'
        },
        {'name': 'Delaware',
        'year': 1787,
        'flower': 'Peach Blossom'
        },
        {'name': 'Florida',
        'year': 1845,
        'flower': 'Orange Blossom'
        },
        {'name': 'Georgia',
        'year': 1788,
        'flower': 'Cherokee Rose'
        }
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
            this.filteredData = this.typeaheadData.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            || item.flower.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.typeaheadData;
        }
    }

    optionSelected(item) {
        this.setValue(this.formatDisplay(item));
    }

    formatDisplay(item) {
        console.log(item)
        if (!item) {
          return '';
        }
        return item.name + ' - ' + item.year;
      }

    private setValue(item) {
        const control = this.form.get('item');
        if (control) {
            control.setValue(item);
        }
    }
}
