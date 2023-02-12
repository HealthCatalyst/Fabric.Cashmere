import {Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TabChangeEvent, TabSetComponent} from '@healthcatalyst/cashmere';

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
    tabHidden = false;
    overflowStyle = new FormControl('more');
    dynamicTabs: string[] = [];

    @ViewChild('tabSet')
    tabSetRef: TabSetComponent;

    selectionChanged(event: TabChangeEvent): void {
        this.selectedIndex = event.index;
    }

    addTask(): void {
        window.alert('The "Click Handler" tab was clicked.');
    }

    toggleHidden(): void {
        this.tabHidden = !this.tabHidden;
    }

    addTab(): void {
        this.dynamicTabs.push( "Dynamic Tab " + (this.dynamicTabs.length + 1));
        setTimeout(() => {
            this.tabSetRef.selectTab(7 + this.dynamicTabs.length);
        });
    }
}
