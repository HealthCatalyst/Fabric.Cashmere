import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

/**
 * @title Multiselect overview
 */
@Component({
    selector: 'hc-multiselect-overview-example',
    templateUrl: 'multiselect-overview-example.component.html',
    styleUrls: ['multiselect-overview-example.component.scss']
})
export class MultiselectOverviewExampleComponent {
    cities = ['Philadelphia', 'Atlanta', 'Salt Lake City', 'Chicago', 'Orlando'];
    readonly selectedCitiesControl = new UntypedFormControl([]);
    multiselectGroup = new UntypedFormGroup({
        selectedCitiesControl: this.selectedCitiesControl
    });
    selectedCareTeamRoles = [];
    careTeamRoles = [{name: 'group 1'}, {name: 'group 2'}, {name: 'group 3'}];

    toggleDisabled(): void {
        if ( this.selectedCitiesControl.enabled ) {
            this.selectedCitiesControl.disable();
        } else {
            this.selectedCitiesControl.enable();
        }
    }
}
