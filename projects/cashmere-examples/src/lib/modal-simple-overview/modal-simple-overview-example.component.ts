import {ModalService, SimpleModalOptions, ModalOptions, ModalSize} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Confirm & Alert Modal Overview
 */
@Component({
    selector: 'hc-modal-simple-overview-example',
    templateUrl: 'modal-simple-overview-example.component.html',
    styleUrls: ['modal-simple-overview-example.component.scss'],
    standalone: false
})
export class ModalSimpleOverviewExampleComponent {
    constructor(private modalService: ModalService) {}
    readonly message = new FormControl(`<p>Are you sure you to purchase this <strong>Didgeridoo</strong>?</p><p>It is a <em>really cool</em> wind instrument, played with vibrating lips to produce a continuous drone while using a special breathing technique called circular breathing.</p>`, {nonNullable: true});
    readonly headerText = new FormControl('Buy a Didgeridoo?', {nonNullable: true});
    readonly icon = new FormControl('fa fa-dollar', {nonNullable: true});
    readonly cancelButtonText = new FormControl('Cancel', {nonNullable: true});
    readonly confirmButtonText = new FormControl('Buy didgeridoo', {nonNullable: true});
    readonly confirmButtonIcon = new FormControl('fa fa-dollar', {nonNullable: true});
    readonly confirmButtonIsDestructive = new FormControl(false, {nonNullable: true});
    readonly footerTooltipText = new FormControl('Help is on the way...', {nonNullable: true});
    readonly modalSize = new FormControl('lg', {nonNullable: true});
    readonly modalIsResizable = new FormControl(false, {nonNullable: true});
    readonly modalIsDraggable = new FormControl(false, {nonNullable: true});
    readonly shouldAllowHTML = new FormControl(true, {nonNullable: true});

    open(): void {
        // set confirmation content options
        const contentOptions: SimpleModalOptions = {
            message: this.shouldAllowHTML.value ? '' : this.message.value,
            messageHTML: this.shouldAllowHTML.value ? this.message.value : '',
            headerText: this.headerText.value,
            icon: this.icon.value,
            cancelButtonText: this.cancelButtonText.value,
            confirmButtonText: this.confirmButtonText.value,
            confirmButtonIcon: this.confirmButtonIcon.value,
            confirmButtonIsDestructive: this.confirmButtonIsDestructive.value,
            footerTooltipText: this.footerTooltipText.value
        };

        // set options for modal window
        const modalOptions: ModalOptions = {
            size: this.modalSize.value as ModalSize,
            isResizable: this.modalIsResizable.value,
            isDraggable: this.modalIsDraggable.value
        }
        this.modalService.confirm(contentOptions, modalOptions).subscribe(confirmed => {
            if(confirmed) {
                console.log("Action confirmed.");
            } else {
                console.log("Action cancelled. Do something else.")
            }
        });
    }
}
