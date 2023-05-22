import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

/** Use `hcTableContainer` to wrap around tables that have sticky headers/columns or other advanced use cases. */
@Directive({
    selector: '[hcTableContainer]'
})
export class TableContainerDirective {
    private readonly onlyNumbersRegex = /^\d+$/;
    @HostBinding('class.hc-table-container')
    _hostClass = true;

    @Input() set tableHeight(height: number | string) {
        this._height = height;
        const isHeightJustNumbers = this.onlyNumbersRegex.test(height.toString());
        this.elRef.nativeElement.style.height = isHeightJustNumbers ? `${height}px` : height;
    }
    get tableHeight(): number | string {
        return this._height;
    }
    private _height: string | number;

    constructor(private elRef: ElementRef) {}
}
