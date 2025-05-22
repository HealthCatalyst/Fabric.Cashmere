import {Directive, HostBinding} from '@angular/core';

/** `hcIconMd` - medium size of hc-icon (20px) - default size */
@Directive({
    selector: '[hcIconMd]',
    standalone: false
})
export class HcIconMediumDirective {
    @HostBinding('class.hc-icon-md')
    _hostHcIconMediumClass = true;
}
