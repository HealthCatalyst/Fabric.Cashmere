import {Directive, HostBinding} from '@angular/core';

@Directive({
    selector: '[hcSuffix]'
})
export class HcSuffixDirective {
    @HostBinding('class.hc-suffix') hostHcSuffixClass = true;
}
