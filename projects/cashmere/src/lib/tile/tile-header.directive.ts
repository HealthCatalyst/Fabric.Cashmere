import {Directive, HostBinding, Input} from '@angular/core';

export type TileHeaderType = 'blue' | 'title' | 'center';
const tileHeaderTypes: TileHeaderType[] = ['blue', 'title', 'center'];

/** Applies one of the Cashmere standard tile header stylings to an element */
@Directive({
    selector: '[hcTileHeader]',
    standalone: false
})
export class TileHeaderDirective {
    private _type: TileHeaderType = 'blue';

    @HostBinding('class.hc-tile-header-blue')
    _headerBlue = true;

    @HostBinding('class.hc-tile-header-title')
    _headerTitle = false;

    @HostBinding('class.hc-tile-header-center')
    _headerCenter = false;

    /** Sets the styling of the header, choices include `blue`, `center`, and `title`; defaults to `blue` */
    @Input()
    get type(): TileHeaderType {
        return this._type;
    }

    set type(typeStr: TileHeaderType) {
        if (!tileHeaderTypes.includes(typeStr)) {
            throw new Error('Unsupported tile header type: ' + typeStr);
        }
        this._type = typeStr;

        this._headerBlue = typeStr === 'blue';
        this._headerTitle = typeStr === 'title';
        this._headerCenter = typeStr === 'center';
    }
}
