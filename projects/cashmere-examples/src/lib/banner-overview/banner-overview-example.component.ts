import {Component} from '@angular/core';

/**
 * @title Banner overview
 */

@Component({
    selector: 'hc-banner-overview-example',
    templateUrl: 'banner-overview-example.component.html',
    styleUrls: ['banner-overview-example.component.scss']
})
export class BannerOverviewExampleComponent {
    private _bannerType: string = 'info';
    bannerClick: boolean = false;
    bannerHide: boolean = false;

    hideBanner() {
        this.bannerHide = true;
    }

    get bannerType(): string {
        return this._bannerType;
    }

    set bannerType(typeVal: string) {
        this._bannerType = typeVal;
        this.bannerHide = false;
    }
}
