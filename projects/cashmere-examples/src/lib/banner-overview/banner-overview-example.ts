import {Component} from '@angular/core';

/**
 * @title Banner overview
 */

@Component({
    selector: 'banner-overview-example',
    templateUrl: 'banner-overview-example.html',
    styleUrls: ['banner-overview-example.css']
})
export class BannerOverviewExample {
    private _bannerType: string = 'info';
    bannerClick: boolean = false;
    bannerHide: boolean = false;

    hideBanner(event: MouseEvent) {
        this.bannerHide = true;
    }

    get bannerType(): string {
        return this._bannerType;
    }

    set bannerType(typeVal) {
        this._bannerType = typeVal;
        this.bannerHide = false;
    }
}
