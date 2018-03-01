import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    template: `<div [hidden]="!active">
             <ng-content></ng-content>
             </div>`,
    selector: `hc-tab`,
    styles: []
})
export class TabComponent {
    @Input() tabTitle: string = '';
    @Input() routerLink: any[] | string;
    active: boolean = false;
}
