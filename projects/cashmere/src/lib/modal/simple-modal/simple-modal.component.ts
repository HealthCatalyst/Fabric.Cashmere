import { Component, OnInit } from '@angular/core';
import { ActiveModal } from '../active-modal';
import { SimpleModalOptions } from './simple-modal-options.model';

@Component({
    selector: 'hc-simple-modal',
    templateUrl: './simple-modal.component.html',
    styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
    public options: SimpleModalOptions;
    constructor(private activeModal: ActiveModal) {}

    ngOnInit(): void {
        this.options = this.activeModal.data;
    }

    cancel(): void {
        this.activeModal.close(false);
    }

    confirm(): void {
        this.activeModal.close(true);
    }
}
