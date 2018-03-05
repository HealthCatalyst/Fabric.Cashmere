/* tslint:disable:component-selector */
/* tslint:disable:use-host-property-decorator */
// https://github.com/mgechev/codelyzer/issues/178#issuecomment-265154480
import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'table[hc-table]',
    template: `<ng-content></ng-content>`,
    styles: []
})
export class TableComponent {
    @HostBinding('class.hc-table') public hcTable = true;
}
