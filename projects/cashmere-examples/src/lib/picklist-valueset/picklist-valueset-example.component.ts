import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Picklist valueset
 */
@Component({
    selector: 'hc-picklist-valueset-example',
    templateUrl: 'picklist-valueset-example.component.html'
})
export class PicklistValuesetExampleComponent {
    readonly modelControl = new FormControl({values: null, valueset: null});

    public config = {
        codeIsSignificant: true,
        useValuesets: true,
        options: {
            values: [
                {code: '001', title: 'Cholera'},
                {code: '001.0', title: 'Cholera due to vibrio cholerae'},
                {code: '001.1', title: 'Cholera due to vibrio cholerae el tor'},
                {code: '001.9', title: 'Cholera, unspecified'},
                {code: '002', title: 'Typhoid and paratyphoid fevers'},
                {code: '002.0', title: 'Typhoid fever'},
                {code: '002.1', title: 'Paratyphoid fever A'},
                {code: '002.2', title: 'Paratyphoid fever B'},
                {code: '002.3', title: 'Paratyphoid fever C'},
                {code: '002.9', title: 'Paratyphoid fever, unspecified'},
                {code: '003', title: 'Other salmonella infections'},
                {code: '003.0', title: 'Salmonella gastroenteritis'}
            ],
            valueSets: [
                {
                    title: 'Cholera Bundle',
                    code: 'bebbf8d1-b4ca-495e-96dd-ed4e2dc32d70',
                    subValueCount: 3,
                    subValues: [
                        {code: '001.0', title: 'Cholera due to vibrio cholerae'},
                        {code: '001.1', title: 'Cholera due to vibrio cholerae el tor'},
                        {code: '001.9', title: 'Cholera, unspecified'}
                    ]
                },
                {
                    title: 'Typhoid',
                    code: 'bebbf8d1-b4ca-495e-96dd-ed4e2dc32d69',
                    subValueCount: 5,
                    subValues: [
                        {code: '002', title: 'Typhoid and paratyphoid fevers'},
                        {code: '002.0', title: 'Typhoid fever'},
                        {code: '002.1', title: 'Paratyphoid fever A'},
                        {code: '002.2', title: 'Paratyphoid fever B'},
                        {code: '002.3', title: 'Paratyphoid fever C'}
                    ]
                }
            ]
        }
    };
}
