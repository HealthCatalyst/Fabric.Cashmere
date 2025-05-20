import {Component} from '@angular/core';

@Component({
    selector: 'hc-toaster-overview-custom',
    templateUrl: 'toaster-overview-custom.component.html',
    styles: [
        `
            .custom-toast-component {
                border-radius: 5px;
                color: white;
                padding: 20px 10px;
                display: flex;
                width: 100%;
            }
            .custom-toast-icon {
                margin-right: 20px;
                margin-left: 5px;
                display: flex;
                align-items: center;
            }
            .custom-toast-header {
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 4px;
            }
            .custom-toast-body {
                font-size: 12px;
                width: 319px;
            }
        `
    ]
})
export class ToasterOverviewCustomComponent {
    randomID = 0;
    randomColor = '#ffffff';
    randomIcon = 'fa-file-lines';
}
