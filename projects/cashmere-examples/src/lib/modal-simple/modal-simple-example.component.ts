import {ModalService, SimpleModalOptions} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';
import { filter, take } from 'rxjs/operators';

/**
 * @title Alert & Confirm Modals
 */
@Component({
    selector: 'hc-modal-simple-example',
    templateUrl: 'modal-simple-example.component.html'
})
export class ModalSimpleExampleComponent {
    constructor(private modalService: ModalService) {}

    confirm(): void {
        // set confirmation content options
        const options: SimpleModalOptions = {
            message: "Good decisions come from experience. Experience comes from bad decisions. This is life... so, never regret. Learn from mistakes and go ahead. (Mark Twain)",
            headerText: "Confirm Action",
            confirmButtonText: "Let's go!"
        };

        // call confirm() to present modal, subscribe to the result
        this.modalService
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
        const options: SimpleModalOptions = {
            message: "Really do the thing? X, Y, & Z will happen.",
            confirmButtonText: "Do the thing!"
        };

        // call confirm() to present modal
        this.modalService.confirm(options);
    }

    confirmDelete():void {
        // set confirmation content options
        const options: SimpleModalOptions = {
            message: "You won't be able to recover this item once it is gone."
        };

        // call confirmDelete() to present modal with deletion styles, subscribe to the result
        this.modalService
            .confirmDestructive(options)
            .subscribe(confirmed => {
                if(confirmed) {
                    console.log("Delete the thing.");
                } else {
                    console.log("Do something else.")
                }
            });
    }

    alert(): void {
        // set confirmation content options
        const options: SimpleModalOptions = {
            message: "There's a party happing three doors down.",
            confirmButtonText: "Rad, thanks!"
        };

        // call alert() to present modal
        this.modalService.alert(options);
    }
}
