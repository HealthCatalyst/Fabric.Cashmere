import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
/**
 * This component exists solely to test the
 * ability of the select component to be compatible with
 * reactive and template forms in angular
 *
 * @export
 * @class SelectIntegrationTestComponent
 */
@Component({
    template: `<form [formGroup]="cityForm">
                  <hc-select formControlName="city" placeholder="Select a City" [options]="cities"></hc-select>
               </form>
              `,
    selector: `hc-integration-test-select`,
    styles: []
})
export class SelectIntegrationTestComponent {

    cityForm: FormGroup;
    cities: Array<string> = ['Atlanta', 'SLC', 'NYC'];

    constructor(private fb: FormBuilder) {
        this.createTestForm();
     }

     createTestForm(): void {
         this.cityForm = this.fb.group({
             city: 'NYC',
             state: 'New York'
         })
     }

}