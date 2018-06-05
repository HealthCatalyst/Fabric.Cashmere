import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[hcPrefix]'
})
export class HcPrefixDirective {
    @HostBinding('class.hc-prefix') hostHcPrefixClass = true;
}
