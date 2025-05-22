import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

/** Use `hcTableContainer` to wrap around tables that have sticky headers/columns or other advanced use cases. */
@Directive({
    selector: '[hcTableContainer]',
    standalone: false
})
export class TableContainerDirective {
    private readonly onlyNumbersRegex = /^\d+$/;
    @HostBinding('class.hc-table-container')
    _hostClass = true;

    @HostBinding('class.hc-table-container-gray')
    _hasGrayBg = false;

    @Input() set tableHeight(height: number | string) {
        this._height = height;
        const isHeightJustNumbers = this.onlyNumbersRegex.test(height.toString());
        this.elRef.nativeElement.style.height = isHeightJustNumbers ? `${height}px` : height;
    }
    get tableHeight(): string | number{
        return this._height;
    }
    private _height: string | number;

    @Input() set hasGrayBg(hasGrayBg: boolean) {
        this._hasGrayBg = hasGrayBg;
    }
    get hasGrayBg(): boolean {
        return this._hasGrayBg;
    }

    constructor(private elRef: ElementRef) {}
}
