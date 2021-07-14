import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Doc { id: number, name: string, department: string , disabled?: boolean}
@Component({
    selector: 'hc-picklist-overview-example',
    templateUrl: './picklist-overview-example.component.html',
    styleUrls: ['./picklist-overview-example.component.scss']
})
export class PicklistOverviewExampleComponent {
    readonly selectedDoctors = new FormControl([]);
    doctors: Doc[] = [
        { id: 1, name: 'Myrtle Higgins', department: "Oncology"},
        { id: 2, name: 'Thomas McCall', department: "Oncology", disabled: true },
        { id: 3, name: 'Virginia Garner', department: "Oncology" },
        { id: 4, name: 'Allen Ryan', department: "Internal Medicine" },
        { id: 5, name: 'Kathryn Kennedy', department: "Internal Medicine" },
        { id: 6, name: 'Annie Rhodes', department: "Internal Medicine" },
        { id: 7, name: 'Howard England', department: "Internal Medicine" },
        { id: 8, name: 'Suzanne Atkinson', department: "General Surgery" },
        { id: 9, name: 'Eugene Finch', department: "General Surgery" },
        { id: 10, name: 'Theodore Rhodes', department: "General Surgery" },
        { id: 11, name: 'Francis Hurst', department: "General Surgery" },
    ];

    hasSearch = true;
    readOnly = false;
    leftPaneLoading = false;
    rightPaneLoading = false;
    hasToolbar = true;
    hasHeader = true;
    hasFooter = true;
    canAddCustomItem = true;
    isGrouped = true;
    canCloseGroup = true;
    usingMaxSelected = false;
    maxSelectedItems = 3;
    height = "300px";
    searchPlaceholder = "Search for doctors...";
    notFoundText = "Nothing to see here";
    addCustomItemText = "Add new doctor?";
    leftHeaderText = "Available Doctors";
    rightHeaderText = "Selected Doctors";

    _customItemId = 12;
    customItemFn(term: string): Doc {
        return { id: this._customItemId++, name: term, department: "Resident" };
    }

    toggleDisabled(): void {
        const doc = this.doctors[1];
        doc.disabled = !doc.disabled;
        this.doctors = [...this.doctors];
    }
}
