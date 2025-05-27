import {Directive, HostBinding} from '@angular/core';

/** Represents a line within a `hc-list-item` row. Multiple can be used within `hc-list-item`. */
@Directive({
    selector: '[hcListLine]',
    standalone: false
})
export class ListLineDirective {
    @HostBinding('class.hc-list-line')
    _hostClass;
}
