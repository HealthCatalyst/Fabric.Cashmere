import {ConfirmationModalService, ConfirmationOptions} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';
import { filter, take } from 'rxjs/operators';

/**
 * @title Simple Confirmation Modals
 */
@Component({
    selector: 'hc-modal-confirmation-simple-example',
    templateUrl: 'modal-confirmation-simple-example.component.html'
})
export class ModalConfirmationSimpleExampleComponent {
    constructor(private confirmService: ConfirmationModalService) {}

    confirm(): void {
        // set confirmation content options
        const options: ConfirmationOptions = {
            message: "Good decisions come from experience. Experience comes from bad decisions. This is life... so, never regret. Learn from mistakes and go ahead. (Mark Twain)",
            headerText: "Confirm Action",
            confirmButtonText: "Let's go!"
        };

        // call confirm() to present modal, subscribe to the result
        this.confirmService
            .confirm(options)
            .pipe(
                take(1),
                filter(confirmed => confirmed))
            .subscribe(() => {
                console.log("Confirmed. Go do the thing now.");
            });
    }

    confirmNoHeader(): void {
        // set confirmation content options
        const options: ConfirmationOptions = {
            message: "Really do the thing? X, Y, & Z will happen.",
            confirmButtonText: "Do the thing!"
        };

        // call confirm() to present modal
        this.confirmService.confirm(options);
    }

    confirmDelete():void {
        // set confirmation content options
        const options: ConfirmationOptions = {
            message: "You won't be able to recover this item once it is gone."
        };

        // call confirmDelete() to present modal with deletion styles, subscribe to the result
        this.confirmService
            .confirmDestructive(options)
            .subscribe(confirmed => {
                if(confirmed) {
                    console.log("Delete the thing.");
                } else {
                    console.log("Do something else.")
                }
            });
    }
}
