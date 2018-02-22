import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { ChipComponent } from '../chip.component';
import { FilterButtonComponent } from '../filter-button/filter-button.component';

@Component({
    selector: 'hc-chip-row',
    templateUrl: './chip-row.component.html',
    styleUrls: ['../chip.component.scss']
})
export class ChipRowComponent implements OnInit {
    @HostBinding('class') hostClass = 'chip-row';
    @Input() singleRow: boolean = false;
    contentClass: string = 'chip-row-contents';

    constructor( ) {
    }

    ngOnInit() {
        if ( this.singleRow ) {
            this.contentClass = 'chip-row-contents single-row';
        }
    }
}
