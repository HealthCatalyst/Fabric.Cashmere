import { Component, Input } from '@angular/core';

@Component({
    template: `<div [hidden]="!active">
             <ng-content></ng-content>
             </div>`,
    selector: `hc-tab`,
    styles: []
})
export class TabComponent {
    @Input() title: string = '';
    @Input() routerLink: string;
    active: boolean = false;
}
