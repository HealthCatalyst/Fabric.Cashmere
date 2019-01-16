import {Directive, HostBinding} from '@angular/core';

/** Including `hcBannerStamp` wraps the enclosed text in a stamp to provide greater emphasis */
@Directive({
    selector: '[hcBannerStamp]'
})
export class BannerStampDirective {
    @HostBinding('class.hc-banner-stamp')
    get _hostClass(): boolean {
        return true;
    }
}
