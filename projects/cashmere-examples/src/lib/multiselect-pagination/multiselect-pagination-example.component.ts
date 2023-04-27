import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiselectPaginatorState } from '@healthcatalyst/cashmere';

/**
 * @title Multiselect with pagination
 */
@Component({
    selector: 'hc-multiselect-pagination-example',
    templateUrl: 'multiselect-pagination-example.component.html',
    styleUrls: ['multiselect-pagination-example.component.scss']
})
export class MultiselectPaginationExampleComponent {
    paginatorState: MultiselectPaginatorState = {
        skip: 0,
        take: 10,
        total: 30
    };

    selectedCareTeamRoles = new FormControl([], {nonNullable: true});
    careTeamRoles = [
        { name: "Care Team A" },
        { name: "Care Team B" },
        { name: "Care Team C" },
    ];
}
