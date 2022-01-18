import {Component, TemplateRef} from '@angular/core';
import {HcToasterService, HcToastOptions, HcToastRef} from '@healthcatalyst/cashmere';
import {ToasterOverviewCustomComponent} from './toaster-overview-custom.component';
import { FormControl } from '@angular/forms';

/**
 * @title Toaster Messages overview
 */
@Component({
    selector: 'hc-toaster-overview-example',
    templateUrl: 'toaster-overview-example.component.html',
    styleUrls: ['toaster-overview-example.component.scss']
})
export class ToasterOverviewExampleComponent {
    readonly toastHeader = new FormControl('Success!');
    readonly toastBody = new FormControl('You are awesome!');
    readonly toastPosition = new FormControl('top-right');
    readonly toastTimeout = new FormControl(5000);
    readonly toastClick = new FormControl(false);
    readonly toastType = new FormControl('success');
    readonly toastWidth = new FormControl(400);
    readonly toastProgress = new FormControl('0');
    readonly progressValue = new FormControl(75);
    readonly customImage = new FormControl(null);

    constructor(private toasterService: HcToasterService) {}

    showToast(content: TemplateRef<unknown>): void {
        let showProgress = false;
        if (parseInt(this.toastProgress.value, 10) > 0) {
            showProgress = true;
        }

        let toastOutput: HcToastRef;
        const options: HcToastOptions = {
            header: this.toastHeader.value,
            body: this.toastBody.value,
            position: this.toastPosition.value,
            timeout: this.toastTimeout.value,
            clickDismiss: this.toastClick.value,
            type: this.toastType.value,
            width: this.toastWidth.value,
            hasProgressBar: showProgress,
            image: this.customImage.value
        };

        if (this.toastType.value === 'custom-template') {
            options.type = 'custom';
            toastOutput = this.toasterService.addToast(options, content);
        } else if (this.toastType.value === 'custom-component') {
            const colorArray: Array<string> = ['#00acac', '#007bff', '#f05323', '#a94c9d', '#e7c447', '#776c7f'];
            const iconArray: Array<string> = ['fa-pied-piper', 'fa-pied-piper-alt', 'fa-leaf', 'fa-coffee', 'fa-beer', 'fa-birthday-cake'];

            options.type = 'custom';

            toastOutput = this.toasterService.addToast(options, ToasterOverviewCustomComponent, {
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
            toastOutput = this.toasterService.addToast(options);
        }

        if (this.toastProgress.value === '2') {
            toastOutput.progress = this.progressValue.value;
        }
    }

    closeLastToast(): void {
        this.toasterService.closeLastToast();
    }

    closeAllToasts(): void {
        this.toasterService.closeAllToasts();
    }
}
