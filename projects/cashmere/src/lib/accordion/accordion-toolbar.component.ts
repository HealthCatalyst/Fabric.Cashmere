import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-accordion-toolbar',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionToolbarComponent {
    @HostBinding('class.hc-accordion-toolbar') true;
}
