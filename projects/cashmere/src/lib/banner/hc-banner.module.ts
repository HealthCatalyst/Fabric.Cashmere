import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HcBannerComponent} from './hc-banner.component';
import {BannerStampDirective} from './hc-banner-stamp.directive';

@NgModule({
    imports: [CommonModule],
    exports: [HcBannerComponent, BannerStampDirective],
    declarations: [HcBannerComponent, BannerStampDirective]
})
export class BannerModule {}
