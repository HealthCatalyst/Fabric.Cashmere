import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * @title Banner overview
 */

@Component({
    selector: 'hc-banner-overview-example',
    templateUrl: 'banner-overview-example.component.html',
    styleUrls: ['banner-overview-example.component.scss']
})
export class BannerOverviewExampleComponent {
    readonly _bannerType = new FormControl('info');
    readonly bannerClick = new FormControl(false);
    bannerHide = false;

    hideBanner() {
        this.bannerHide = true;
    }

    showBanner() {
        this.bannerHide = false;
    }
}
