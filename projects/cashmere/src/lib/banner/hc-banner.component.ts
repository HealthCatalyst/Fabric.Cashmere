import {Component, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {parseBooleanAttribute} from '../util';

export type BannerType = 'success' | 'info' | 'warning' | 'alert';
const bannerTypes: BannerType[] = ['success', 'info', 'warning', 'alert'];

/** Notification banners are used for general information about the state of the application or upcoming events. For instant
 * feedback responding to user actions, use a toaster message.*/
@Component({
    selector: 'hc-banner',
    templateUrl: './hc-banner.html',
    styleUrls: ['./hc-banner.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HcBannerComponent {
    private _type: BannerType = 'info';
    private _clickDismiss: boolean = false;

    /** If the banner can be dismissed, emits when the banner is clicked to close */
    @Output()
    bannerClose: EventEmitter<MouseEvent> = new EventEmitter();

    /** Style of the notification banner; Defaults to info.
     * Options are: `success`, `info`, `warning`, `alert`*/
    @Input()
    get type(): BannerType {
        return this._type;
    }

    set type(typeVal: BannerType) {
        if (!bannerTypes.includes(typeVal)) {
            throw new Error('Unsupported banner type: ' + typeVal);
        }
        this._type = typeVal;
    }

    /** When set to true, a close icon is added to the right side and `bannerClose`
     * emits on a click. Defaults to false.*/
    @Input()
    get clickDismiss(): boolean {
        return this._clickDismiss;
    }

    set clickDismiss(dismissVal: boolean) {
        this._clickDismiss = parseBooleanAttribute(dismissVal);
    }

    _bannerClick(event: MouseEvent) {
        if (this._clickDismiss) {
            this.bannerClose.emit(event);
        }
    }
}
