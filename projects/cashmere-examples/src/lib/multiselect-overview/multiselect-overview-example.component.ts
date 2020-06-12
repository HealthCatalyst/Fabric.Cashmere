import {Component} from '@angular/core';

/**
 * @title Multiselect overview
 */
@Component({
    selector: 'hc-multiselect-overview-example',
    templateUrl: 'multiselect-overview-example.component.html',
    styleUrls: ['multiselect-overview-example.component.scss']
})
export class MultiselectOverviewExampleComponent {
    cities = ["Philadelphia", "Atlanta", "Salt Lake City", "Chicago", "Orlando"];
    selectedCities = [];
    selectedCareTeamRoles = [];
    careTeamRoles = [
      {name: "group 1"},
      {name: "group 2"},
      {name: "group 3"},
    ];
}
