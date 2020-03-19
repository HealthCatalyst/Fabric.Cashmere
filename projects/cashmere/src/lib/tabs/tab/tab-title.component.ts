import {Component, ViewEncapsulation, TemplateRef, ViewChild} from '@angular/core';

/** Contains the HTML markup for tab titles */
@Component({
    selector: 'hc-tab-title',
    template: '<ng-template #tabTitle><ng-content></ng-content></ng-template>',
    encapsulation: ViewEncapsulation.None
})
export class HcTabTitleComponent {
    @ViewChild('tabTitle', {static: false})
    public tabTitle: TemplateRef<any>;
}
