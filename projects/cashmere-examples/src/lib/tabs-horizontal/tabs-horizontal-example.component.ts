import {Component} from '@angular/core';
import {TabChangeEvent} from '@healthcatalyst/cashmere';

/**
 * @title Horizontal Tabs with Event Handling
 */
@Component({
    selector: 'hc-tabs-horizontal-example',
    templateUrl: 'tabs-horizontal-example.component.html',
    styleUrls: ['tabs-horizontal-example.component.scss']
})
export class TabsHorizontalExampleComponent {
    selectedIndex = 0;

    selectionChanged(event: TabChangeEvent): void {
        this.selectedIndex = event.index;
    }

    addTask(): void {
        window.alert('The "Add Task" tab was clicked.');
    }
}
