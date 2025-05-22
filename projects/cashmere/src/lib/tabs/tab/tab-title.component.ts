import {Component, ViewEncapsulation, TemplateRef, ViewChild} from '@angular/core';

/** Contains the HTML markup for tab titles */
@Component({
    selector: 'hc-tab-title',
    template: '<ng-template #tabTitle><ng-content></ng-content></ng-template>',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class HcTabTitleComponent {
    @ViewChild('tabTitle')
    public tabTitle: TemplateRef<unknown>;
}
