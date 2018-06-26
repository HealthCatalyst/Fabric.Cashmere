import {Component, Input} from '@angular/core';

@Component({
    template: `<div [hidden]="!_active">
             <ng-content></ng-content>
             </div>`,
    selector: `hc-tab`,
    styles: []
})
export class TabComponent {
    /** Text to be displayed on the tab */
    @Input() tabTitle: string = '';
    /** Router path that the tab routes to. If one tab uses the routerLink in a tab set, all must use the router link.
     * Can be specified as '/path/2' or ['path', '2']
     */
    @Input() routerLink: any[] | string;
    _active: boolean = false;
}
