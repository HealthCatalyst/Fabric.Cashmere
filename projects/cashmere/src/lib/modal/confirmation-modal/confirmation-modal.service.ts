import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalOptions } from '../modal-options';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationOptions } from './confirmation-modal-options.model';
import { ConfirmationModalComponent } from './confirmation-modal.component';

/**
 * Convenient service for generating modals requesting a confirm/cancel response.
 */
@Injectable({
    providedIn: 'root'
})
export class ConfirmationModalService {
    constructor(private modalService: ModalService) {}

    // Default options for the content of a confirmation modal
    private get defaultConfirmationOptions(): ConfirmationOptions {
        return {
            message: 'Are you sure?',
            icon: 'hc-ico-question',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
            confirmButtonIsDestructive: false,
        };
    }


    // Default options for the content of a delete confirmation modal
    private get defaultDeleteOptions(): ConfirmationOptions {
        return {
            message: 'Are you sure you want to delete this item?',
            headerText: 'Delete item?',
            icon: 'hc-ico-trash',
            confirmButtonText: 'Delete item',
            confirmButtonIsDestructive: true,
        };
    }

    // default options for the modal window itself
    private get defaultModalOptions(): ModalOptions {
        return {
            ignoreOverlayClick: true,
            size: 'md'
        };
    }

    /**
     * Opens a confirmation modal pre-populated with default delete options.
     * @param contentOptions Options to configure the content of the confirmation modal
     * @param modalOptions Options to configure the modal window itself
     * @returns True if the user confirmed the action, false if they cancelled
     */
    confirmDelete(contentOptions: ConfirmationOptions, modalOptions?: ModalOptions): Observable<boolean> {
        const mergedDeleteContentOptions = Object.assign(this.defaultDeleteOptions, contentOptions);
        return this.confirm(mergedDeleteContentOptions, modalOptions);
    }

    /**
     * Opens a simple confirmation modal with a confirm and cancel button.
     * @param contentOptions Options to configure the content of the confirmation modal
     * @param modalOptions Options to configure the modal window itself
     * @returns True if the user confirmed the action, false if they cancelled
     */
    confirm(contentOptions: ConfirmationOptions, modalOptions?: ModalOptions): Observable<boolean> {
        const mergedContentOptions = Object.assign(this.defaultConfirmationOptions, contentOptions);

        const mergedModalOptions = Object.assign(this.defaultModalOptions, modalOptions);
        mergedModalOptions.data = mergedContentOptions;

        const modalRef = this.modalService.open(ConfirmationModalComponent, mergedModalOptions);
        return modalRef.result.pipe(map(result => result as boolean));
    }
}
