import {Component, ViewChild} from '@angular/core';
import {DragDropAssignment, DragListComponent} from 'projects/cashmere/src/lib/drag-list/drag-list.component';

/**
 * @title Overview of Drag List functionality
 */
@Component({
    selector: 'hc-drag-list-overview-example',
    templateUrl: 'drag-list-overview-example.component.html',
    styleUrls: ['./drag-list-overview-example.component.scss']
})
export class DragListOverviewExampleComponent {
    @ViewChild(DragListComponent) dragList: DragListComponent;

    options: {id: number; name: string; title: string}[] = [
        {id: 1, name: 'option 1', title: 'this is option 1'},
        {id: 2, name: 'option 2', title: 'this is option 2'},
        {id: 3, name: 'option 3', title: 'this is option 3'},
        {id: 4, name: 'option 4', title: 'this is option 4'},
        {id: 5, name: 'option 5', title: 'this is option 5'}
    ];
    assignments: DragDropAssignment[] = [
        {
            target: {id: 1, name: 'target 1', title: 'this is target 1'},
            assignment: null,
            locked: false
        },
        {
            target: {id: 2, name: 'target 2', title: 'this is target 2'},
            assignment: null,
            locked: false
        },
        {
            target: {id: 3, name: 'target 3', title: 'this is target 3'},
            assignment: this.options[4],
            locked: true
        }
    ];

    saveSelections(selections: DragDropAssignment[]) {
        console.log('SELECTIONS', selections);
        window.alert('check console for received selections');
    }
}
