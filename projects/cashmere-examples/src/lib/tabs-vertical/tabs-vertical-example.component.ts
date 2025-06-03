import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabSetComponent } from '@healthcatalyst/cashmere';

/**
 * @title Vertical and Horizontal Tabs
 */
@Component({
    selector: 'hc-tabs-vertical-example',
    templateUrl: 'tabs-vertical-example.component.html',
    styleUrls: ['tabs-vertical-example.component.scss'],
    standalone: false
})
export class TabsVerticalExampleComponent {
    readonly _tight = new FormControl(false, {nonNullable: true});

    @ViewChild('nestedTabs')
    nestedTabs: TabSetComponent;

    nestedTabMoreMenu(): void {
        /** Use refreshTabWidths() to recalculate the widths for the More menu
         * if tabs were not visible when the page or component loaded */
        setTimeout(() => {
            this.nestedTabs.refreshTabWidths();
        });
    }
}
