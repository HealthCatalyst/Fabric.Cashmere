import {Directive, HostBinding, Input} from '@angular/core';

const supportedTypes = ['blue', 'title', 'center'];

export function validateTypeInput(inputStr: string) {
    if (supportedTypes.indexOf(inputStr) < 0) {
        throw Error('Unsupported tile header type: ' + inputStr);
    }
}

/** Applies one of the Cashmere standard tile header stylings to an element */
@Directive({
    selector: '[hcTileHeader]'
})
export class TileHeaderDirective {
    private _type: string = 'blue';

    @HostBinding('class.hc-tile-header-blue')
    _headerBlue: boolean = true;

    @HostBinding('class.hc-tile-header-title')
    _headerTitle: boolean = false;

    @HostBinding('class.hc-tile-header-center')
    _headerCenter: boolean = false;

    /** Sets the styling of the header, choices include `blue`, `center`, and `title`; defaults to `blue` */
    @Input()
    get type(): string {
        return this._type;
    }

    set type(typeStr) {
        validateTypeInput(typeStr);
        this._type = typeStr;

        this._headerBlue = typeStr === 'blue';
        this._headerTitle = typeStr === 'title';
        this._headerCenter = typeStr === 'center';
    }
}
