import {Component} from '@angular/core';

/**
 * @title Multiselect with embedded checkbox
 */
@Component({
    selector: 'hc-multiselect-embed-checkbox-example',
    templateUrl: 'multiselect-embed-checkbox-example.component.html',
    styleUrls: ['multiselect-embed-checkbox-example.component.scss']
})
export class MultiselectEmbedCheckboxExampleComponent {
    selectedCareTeamRoles = [];
    careTeamRoles = [
      {name: "Care Team A"},
      {name: "Care Team B"},
      {name: "Care Team C"},
    ];
}
