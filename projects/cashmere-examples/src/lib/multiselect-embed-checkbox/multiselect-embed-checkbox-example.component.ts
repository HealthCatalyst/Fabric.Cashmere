import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Multiselect with embedded checkbox
 */
@Component({
    selector: 'hc-multiselect-embed-checkbox-example',
    templateUrl: 'multiselect-embed-checkbox-example.component.html',
    styleUrls: ['multiselect-embed-checkbox-example.component.scss'],
    standalone: false
})
export class MultiselectEmbedCheckboxExampleComponent {
    selectedCareTeamRoles = new FormControl([], {nonNullable: true});
    careTeamRoles = [
        { name: "Care Team A" },
        { name: "Care Team B" },
        { name: "Care Team C" },
    ];
}
