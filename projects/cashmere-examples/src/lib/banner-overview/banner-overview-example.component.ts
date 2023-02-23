import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

/**
 * @title Banner overview
 */

@Component({
    selector: 'hc-banner-overview-example',
    templateUrl: 'banner-overview-example.component.html',
    styleUrls: ['banner-overview-example.component.scss']
})
export class BannerOverviewExampleComponent {
    readonly _bannerType = new UntypedFormControl('info');
    readonly bannerClick = new UntypedFormControl(false);
    bannerHide = false;

    hideBanner(): void {
        this.bannerHide = true;
    }

    showBanner(): void {
        this.bannerHide = false;
    }
}
