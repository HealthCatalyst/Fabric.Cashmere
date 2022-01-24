import {Component} from '@angular/core';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-table-demo',
    templateUrl: './table-demo.component.html',
    styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService) {
        super(sectionService);
    }

    // Logic for bulk actions table example
    public get allChecked(): boolean {
        return this.bulkExampleSelectedCount === 4;
    }
    public get bulkExampleSelectedCount(): number {
        return this.bulkActionExampleState.filter(i => i).length;
    }
    public get masterCheckboxIsIndeterminate(): boolean {
        return this.bulkExampleSelectedCount !== 0 && this.bulkExampleSelectedCount !== 4;
    }
    public bulkActionExampleState = [false, false, false, false];

    masterCheckboxClicked(): void {
        if (this.bulkExampleSelectedCount === this.bulkActionExampleState.length) {
            this.bulkActionExampleState.forEach((v, i, a) => {
                a[i] = false;
            });
        } else {
            this.bulkActionExampleState.forEach((v, i, a) => {
                a[i] = true;
            });
        }
    }
}
