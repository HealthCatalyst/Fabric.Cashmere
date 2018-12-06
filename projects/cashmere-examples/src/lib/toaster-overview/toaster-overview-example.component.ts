import {Component, TemplateRef} from '@angular/core';
import {HcToasterService, HcToastOptions, HcToastRef} from '@healthcatalyst/cashmere';

/**
 * @title Toaster Messages overview
 */
@Component({
    selector: 'hc-toaster-overview-example',
    templateUrl: 'toaster-overview-example.component.html',
    styleUrls: ['toaster-overview-example.component.scss']
})
export class ToasterOverviewExampleComponent {
    toastHeader: string = 'Success!';
    toastBody: string = 'You are awesome!';
    toastPosition: string = 'top-right';
    toastTimeout: number = 5000;
    toastClick: boolean = false;
    toastType: string = 'success';

    constructor(private toasterService: HcToasterService) {}

    showToast(content: TemplateRef<any>) {
        let options: HcToastOptions = {
            header: this.toastHeader,
            body: this.toastBody,
            position: this.toastPosition,
            timeout: this.toastTimeout,
            clickDismiss: this.toastClick,
            type: this.toastType
        };

        if (this.toastType === 'custom') {
            this.toasterService.addToast(options, content);
        } else {
            this.toasterService.addToast(options);
        }
    }

    closeLastToast() {
        this.toasterService.closeLastToast();
    }

    closeAllToasts() {
        this.toasterService.closeAllToasts();
    }
}
