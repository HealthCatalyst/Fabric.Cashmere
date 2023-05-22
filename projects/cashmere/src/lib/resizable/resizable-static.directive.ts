import { Directive, HostBinding } from '@angular/core';

/** Can be added to a sibling of a resizable element that does not need a resize handle */
@Directive({
    selector: '[hcResizableStatic]'
})
export class ResizableStaticDirective {
    @HostBinding('class.hc-resizable-static')
    _hostClass = true;
}
