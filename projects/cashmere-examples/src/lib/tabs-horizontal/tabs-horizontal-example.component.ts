import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
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
    overflowStyle = new FormControl('more');

    selectionChanged(event: TabChangeEvent): void {
        this.selectedIndex = event.index;
    }

    addTask(): void {
        window.alert('The "Click Handler" tab was clicked.');
    }
}
