import {Component, TemplateRef} from '@angular/core';
import {HcToasterService, HcToastOptions, HcToastRef} from '@healthcatalyst/cashmere';
import {ToasterOverviewCustomComponent} from './toaster-overview-custom.component';

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

        if (this.toastType === 'custom-template') {
            options.type = 'custom';
            this.toasterService.addToast(options, content);
        } else if (this.toastType === 'custom-component') {
            let colorArray: Array<string> = ['#00acac', '#007bff', '#f05323', '#a94c9d', '#e7c447', '#776c7f'];
            let iconArray: Array<string> = ['fa-pied-piper', 'fa-pied-piper-alt', 'fa-leaf', 'fa-coffee', 'fa-beer', 'fa-birthday-cake'];

            options.type = 'custom';

            this.toasterService.addToast(options, ToasterOverviewCustomComponent, {
                randomID: Math.ceil(Math.random() * 10000),
                randomColor: colorArray[Math.floor(Math.random() * colorArray.length)],
                randomIcon: iconArray[Math.floor(Math.random() * iconArray.length)]
            });

            // If more control is needed in configuring the custom component, a function may be passed into componentSetup instead:
            /* this.toasterService.addToast(options, ToasterOverviewCustomComponent,
                (componentInstance: ToasterOverviewCustomComponent) => {
                    componentInstance.randomID = Math.ceil(Math.random() * 10000);
                    componentInstance.randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
                    componentInstance.randomIcon = iconArray[Math.floor(Math.random() * iconArray.length)];
            }); */
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
