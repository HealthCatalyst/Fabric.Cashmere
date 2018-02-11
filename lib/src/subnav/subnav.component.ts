import { Component, Input } from '@angular/core';

@Component({
    selector: 'hc-subnav',
    template: `<div class="subnav" [ngClass]="{'fixed-top': fixedTop}"><ng-content></ng-content></div>`,
    styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent {

    @Input() fixedTop: boolean = false;

    constructor() {
    }

}
