import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hc-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

    @Input() action: boolean = false;
    chipCursor: string = 'auto';
    chipType: string = 'chip';

    constructor() {
    }

    ngOnInit() {
        if (this.action) {
            this.chipCursor = 'pointer';
            this.chipType = 'chip close';
        }
    }
}
