import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Container for content that is to be shown in-line with the accordion trigger  */
@Component({
    selector: 'hc-accordion-toolbar',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionToolbarComponent {
    @HostBinding('class.hc-accordion-toolbar') _hostClass = true;
}
