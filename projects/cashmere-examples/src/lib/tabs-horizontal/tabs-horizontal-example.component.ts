import {Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TabChangeEvent, TabSetComponent} from '@healthcatalyst/cashmere';

/**
 * @title Horizontal Tabs with Event Handling
 */
@Component({
    selector: 'hc-tabs-horizontal-example',
    templateUrl: 'tabs-horizontal-example.component.html',
    styleUrls: ['tabs-horizontal-example.component.scss'],
    standalone: false
})
export class TabsHorizontalExampleComponent {
    selectedIndex = 0;
    tabHidden = false;
    overflowStyle = new FormControl('more', {nonNullable: true});
    dynamicTabName = 'Renaming Tabs';
    dynamicTabIcon = 'icon-circle-check';
    tabNameControl = new FormControl(this.dynamicTabName, {nonNullable: true});
    dynamicTabs: string[] = [];

    @ViewChild('tabSet')
    tabSetRef: TabSetComponent;

    selectionChanged(event: TabChangeEvent): void {
        this.selectedIndex = event.index;
    }

    clickHandler(evt: Event): void {
        const seconds = evt.timeStamp / 1000;
        window.alert('The "Click Handler" tab was clicked ' + seconds + ' seconds after the page was loaded.');
    }

    updateTabName(): void {
        const iconArray: Array<string> = ['fa-spider', 'fa-pizza-slice', 'fa-leaf', 'fa-mug-hot', 'fa-beer-mug-empty', 'fa-cake-candles'];

        this.dynamicTabName = this.tabNameControl.value;
        this.dynamicTabIcon = iconArray[Math.floor(Math.random() * iconArray.length)];

        setTimeout(() => {
            // Force the tab set to recalculate the widths of each tab for overflow
            this.tabSetRef.refreshTabWidths(true);
        });
    }

    toggleHidden(): void {
        this.tabHidden = !this.tabHidden;
    }

    addTab(): void {
        this.dynamicTabs.push( "Dynamic Tab " + (this.dynamicTabs.length + 1));
        setTimeout(() => {
            this.selectLastTab();
        });
    }

    selectLastTab(): void {
        this.tabSetRef.selectTab(7 + this.dynamicTabs.length);
    }
}
