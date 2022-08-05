import {Component, ViewEncapsulation, TemplateRef, ViewChild} from '@angular/core';

/** Contains the HTML markup for tab titles */
@Component({
    selector: 'hc-tab-title',
    template: '<ng-content #tabTitle></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcTabTitleComponent {
    @ViewChild('tabTitle')
    public tabTitle: TemplateRef<unknown>;
}
