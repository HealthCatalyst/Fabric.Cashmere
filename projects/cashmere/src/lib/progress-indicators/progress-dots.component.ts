import { Component, Input, ViewEncapsulation } from '@angular/core';

export type ProgressDotsColor = 'light' | 'dark';

const supportedColors: ProgressDotsColor[] = ['light', 'dark'];

export function validateColorInput(inputStr: ProgressDotsColor): void {
    if (supportedColors.indexOf(inputStr) < 0) {
        throw Error('Unsupported progress dots color value: ' + inputStr);
    }
}

@Component({
    selector: 'hc-progress-dots',
    templateUrl: 'progress-dots.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProgressDotsComponent {
    private _color: ProgressDotsColor = 'dark';

    /** Use `light` on darker backgrounds and `dark` for lighter backgrounds. */
    @Input()
    get color(): ProgressDotsColor {
        return this._color;
    }

    set color(colorVal: ProgressDotsColor) {
        validateColorInput(colorVal);
        this._color = colorVal;
    }

    /** If true, the loader will center itself within its container. */
    @Input()
    public isCentered = true;
    /** If true, you'll get a teeny tiny little loader. */
    @Input()
    public isMini = false;
}
