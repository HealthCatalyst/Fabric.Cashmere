/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';

/** Element to add a co-branding image to the right of the navbar */
@Component({
    selector: 'hc-navbar-cobrand',
    template: `<img [src]="src" [ngStyle]="{height:_imgHeight, 'width':_imgWidth}" (load)="_checkRatio($event)">`,
    styleUrls: ['./navbar-cobrand.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarCobrandComponent {
    _color: 'light' | 'dark' = 'light';
    _imgHeight = '37px';
    _imgWidth = 'auto';

    @HostBinding('class') _hostClass = 'hc-navbar-cobrand-' + this.color;

    /** Defines the path for the co-branding image.
     * The image should be in landscape (horizontal) format; it will automatically be scaled to fit the navbar. */
    @Input()
    src: string;

    /** Sets the background for co-branding; use `light` for images that require a white background. Defaults to `light` */
    @Input()
    get color(): 'light' | 'dark' {
        return this._color;
    }
    set color( val: 'light' | 'dark' ) {
        this._color = val;
        this._hostClass = 'hc-navbar-cobrand-' + val;
    }

    /** Validate that the image will not be wider than 200px when scaled to 37px height; if not, scale the width rather than the height */
    _checkRatio(evt: any): void {
        const width = evt.srcElement.width;
        const height = evt.srcElement.height;
        const ratio = width / height;

        if ( ratio * 37 > 200 ) {
            this._imgWidth = '200px';
            this._imgHeight = 'auto';
        }
    }
}
